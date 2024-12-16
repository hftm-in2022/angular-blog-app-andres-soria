import { Component, Input } from '@angular/core';
import { BlogOverviewCardComponent } from '../../shared/blog-overview-card/blog-overview-card.component';
import { RouterLink } from '@angular/router';

interface Model {
  data: {
    id: number;
    title: string;
    contentPreview: string;
    author: string;
    likes: number;
    comments: number;
    likedByMe: boolean;
    createdByMe: boolean;
    headerImageUrl?: string | undefined;
  }[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  maxPageSize: number;
}

@Component({
  selector: 'app-blog-overview-page',
  standalone: true,
  imports: [BlogOverviewCardComponent, RouterLink],
  templateUrl: './blog-overview-page.component.html',
  styleUrl: './blog-overview-page.component.scss',
})
export class BlogOverviewPageComponent {
  @Input({ required: true }) model!: Model;
}
