import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogApiService } from '../../core/services/blog-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, merge, Observable, shareReplay } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { LoadingStateService } from '../../core/services/loading-state.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-add-blog-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './add-blog-page.component.html',
  styleUrl: './add-blog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBlogPageComponent {
  private loadingStateService = inject(LoadingStateService);
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private blogService: BlogApiService = inject(BlogApiService);
  isLoading = this.loadingStateService.isLoading;

  blogForm: FormGroup;
  readonly title = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  readonly content = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);

  titleErrorMessage = signal('');
  contentErrorMessage = signal('');

  constructor() {
    merge(this.title.statusChanges, this.title.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateTitleErrorMessage());

    merge(this.content.statusChanges, this.content.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateContentErrorMessage());

    this.blogForm = new FormGroup({ title: this.title, content: this.content });
  }

  showBlogFormButtonText$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.HandsetPortrait)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  updateTitleErrorMessage() {
    if (this.title.hasError('required')) {
      this.titleErrorMessage.set(
        "A post wihtout a title... you're not even trying",
      );
    } else if (this.title.hasError('minlength')) {
      this.titleErrorMessage.set('Title must be at least 5 characters long');
    } else {
      this.titleErrorMessage.set('');
    }
  }

  updateContentErrorMessage() {
    if (this.title.hasError('required')) {
      this.contentErrorMessage.set('A post without content is not a post');
    } else if (this.title.hasError('minlength')) {
      this.contentErrorMessage.set(
        'Content must be at least 10 characters long',
      );
    } else {
      this.contentErrorMessage.set('');
    }
  }

  onNewBlogSubmit() {
    if (this.blogForm.valid) {
      this.loadingStateService.setLoadingState(true);
      const newBlog = this.blogForm.value;
      this.blogService.addBlog(newBlog).subscribe({
        next: () => {
          this.loadingStateService.setLoadingState(false);
          this.router.navigate(['/overview']);
        },
        error: (err) => {
          console.error('Failed to create blog:', err);
        },
      });
    }
  }
}
