import { Component, Input } from '@angular/core';
import { BlogPostPreview } from './../../../core/models/blog-post-preview.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-blog-post-card',
  templateUrl: './blog-post-card.component.html',
  styleUrls: ['./blog-post-card.component.scss'],
  imports: [MatButtonModule, MatCardModule, MatButtonToggleModule, MatIcon],
})
export class BlogPostCardComponent {
  @Input() blogPostPreview!: BlogPostPreview;
}
