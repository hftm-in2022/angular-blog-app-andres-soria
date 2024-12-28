import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingStateService } from './core/services/loading-state.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppToolbarComponent } from './shared/app-toolbar/app-toolbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatProgressBarModule,
    AppToolbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private loadingStateService = inject(LoadingStateService);
  isLoading = this.loadingStateService.isLoading;
}
