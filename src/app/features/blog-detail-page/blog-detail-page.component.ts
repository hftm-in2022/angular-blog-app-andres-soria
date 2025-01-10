import { DatePipe } from '@angular/common';
import {
  Component,
  inject,
  Input,
  signal,
  OnChanges,
  ErrorHandler,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import {
  BlogApiService,
  BlogDetails,
} from '../../core/services/blog-api.service';
import { LoadingStateService } from '../../core/services/loading-state.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationStateService } from '../../core/services/authentication-state.service';
import { merge, switchMap, finalize, tap, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-blog-detail-page',
  imports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe,
    RouterLink,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './blog-detail-page.component.html',
  styleUrl: './blog-detail-page.component.scss',
})
export class BlogDetailPageComponent implements OnChanges {
  @Input({ required: true }) model!: BlogDetails;
  private loadingStateService = inject(LoadingStateService);
  private blogApiService: BlogApiService = inject(BlogApiService);
  private authenticationStateService = inject(AuthenticationStateService);
  private router = inject(Router);
  private errorHandler = inject(ErrorHandler);

  isLoading = this.loadingStateService.isLoading;
  contentErrorMessage = signal('');
  isUserAuthenticated: boolean;
  deleteBlogAllowed = false;

  commentForm: FormGroup;
  readonly commentContent = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(1000),
  ]);

  constructor() {
    merge(this.commentContent.statusChanges, this.commentContent.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateContentErrorMessage());

    this.commentForm = new FormGroup({ content: this.commentContent });

    this.isUserAuthenticated =
      this.authenticationStateService.getAuthenticationState();
  }

  ngOnChanges() {
    if (this.model) {
      this.deleteBlogAllowed =
        this.authenticationStateService.userHasRole('admin') ||
        this.model.createdByMe;
    }
  }

  toggleLike() {
    const newLikedState = !this.model.likedByMe;
    this.loadingStateService.setLoadingState(true);
    this.blogApiService
      .toggleBlogEntryLiked(this.model.id, newLikedState)
      .pipe(
        tap(() => {
          this.model.likedByMe = newLikedState;
          this.model.likes += newLikedState ? 1 : -1;
        }),
        catchError((err) => {
          this.errorHandler.handleError(err);
          return [];
        }),
        finalize(() => this.loadingStateService.setLoadingState(false)),
      )
      .subscribe();
  }

  onCommentSubmit() {
    if (this.commentContent.valid) {
      this.loadingStateService.setLoadingState(true);
      const newComment = this.commentContent.value!;
      this.blogApiService
        .addComment(this.model.id, newComment)
        .pipe(
          switchMap(() => this.blogApiService.getBlogById(this.model.id)),
          catchError((err) => {
            this.errorHandler.handleError(err);
            return [];
          }),
          finalize(() => {
            this.loadingStateService.setLoadingState(false);
            this.commentContent.setValue('');
          }),
        )
        .subscribe({
          next: (blog) => {
            this.model = blog;
          },
          error: (err) => {
            console.error('An error occurred:', err);
          },
        });
    }
  }

  deleteBlogPost() {
    this.loadingStateService.setLoadingState(true);
    this.blogApiService
      .deleteBlog(this.model.id)
      .pipe(
        tap(() => {
          this.router.navigate(['/overview']);
        }),
        catchError((err) => {
          this.errorHandler.handleError(err);
          return [];
        }),
        finalize(() => this.loadingStateService.setLoadingState(false)),
      )
      .subscribe();
  }

  updateContentErrorMessage() {
    if (this.commentContent.hasError('required')) {
      this.contentErrorMessage.set('Comment content is required');
    } else if (this.commentContent.hasError('minlength')) {
      this.contentErrorMessage.set(
        'Content must be at least 10 characters long',
      );
    } else if (this.commentContent.hasError('maxlength')) {
      this.contentErrorMessage.set('A comment is limited to 1000 characters');
    } else {
      this.contentErrorMessage.set('');
    }
  }
}
