import { Component, OnInit } from '@angular/core';
import { BlogPostPreview } from '../../../core/models/blog-post-preview.model';
import { BlogApiService } from '../../../core/services/blog-api.service';
import { BlogPostCardComponent } from '../blog-post-card/blog-post-card.component';

@Component({
  standalone: true,
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss'],
  imports: [BlogPostCardComponent],
})
export class BlogPostListComponent implements OnInit {
  blogPostPreviews: BlogPostPreview[] = [];

  constructor(private blogApiService: BlogApiService) {}

  ngOnInit(): void {
    this.blogApiService.getAllPosts().subscribe({
      next: (response) => {
        this.blogPostPreviews = response.data;
      },
      error: (err) => console.error('Error fetching blog posts:', err),
    });
  }
}
