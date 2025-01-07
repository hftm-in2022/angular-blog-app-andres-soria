import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import {
  BlogApiService,
  BlogDetails,
} from '../../core/services/blog-api.service';

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
  ],
  templateUrl: './blog-detail-page.component.html',
  styleUrl: './blog-detail-page.component.scss',
})
export class BlogDetailPageComponent {
  @Input({ required: true }) model!: BlogDetails;
  blogApiService: BlogApiService = inject(BlogApiService);

  addComment() {
    this.blogApiService.addComment(this.model.id, { content: 'New comment' });
  }
}
