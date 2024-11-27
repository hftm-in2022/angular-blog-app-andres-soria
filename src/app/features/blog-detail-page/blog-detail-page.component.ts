import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-detail-page',
  imports: [],
  templateUrl: './blog-detail-page.component.html',
  styleUrl: './blog-detail-page.component.scss',
})
export class BlogDetailPageComponent {
  @Input({ required: true }) id!: number;
}
