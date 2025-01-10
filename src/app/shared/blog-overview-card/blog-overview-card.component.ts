import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

export interface Blog {
  author: string;
  comments: number;
  headerImageUrl?: string;
  contentPreview: string;
  createdByMe: boolean;
  id: number;
  likedByMe: boolean;
  likes: number;
  title: string;
}

@Component({
  selector: 'app-blog-overview-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatButtonToggleModule],
  templateUrl: './blog-overview-card.component.html',
  styleUrl: './blog-overview-card.component.scss',
})
export class BlogOverviewCardComponent {
  @Input({ required: true }) blog!: Blog;
}
