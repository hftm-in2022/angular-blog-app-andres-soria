import { Component, Input } from '@angular/core';
import { BlogOverviewCardComponent } from '../../shared/blog-overview-card/blog-overview-card.component';
import { Entries } from '../../core/services/blog-api.service';

@Component({
  selector: 'app-blog-overview-page',
  templateUrl: './blog-overview-page.component.html',
  styleUrls: ['./blog-overview-page.component.scss'],
  imports: [BlogOverviewCardComponent],
})
export class BlogOverviewPageComponent {
  pageTitle = 'Blogs overview';
  @Input({ required: true }) model!: Entries;
}
