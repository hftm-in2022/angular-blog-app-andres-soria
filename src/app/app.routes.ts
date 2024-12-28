import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { finalize, lastValueFrom } from 'rxjs';
import {
  BlogApiService,
  BlogDetails,
  Entries,
} from './core/services/blog-api.service';
import { LoadingStateService } from './core/services/loading-state.service';

export const blogPostsResolver: ResolveFn<Entries> = async () => {
  const blogApiService = inject(BlogApiService);
  const loadingService = inject(LoadingStateService);
  loadingService.setLoadingState(true);
  return await lastValueFrom(
    blogApiService
      .getAllPosts()
      .pipe(finalize(() => loadingService.setLoadingState(false))),
  );
};

export const blogDetailResolver: ResolveFn<BlogDetails> = (route) => {
  const blogApiService = inject(BlogApiService);
  const idParam = route.paramMap.get('id');
  const blogId = Number(idParam);
  const loadingService = inject(LoadingStateService);
  loadingService.setLoadingState(true);
  return blogApiService
    .getBlogById(blogId)
    .pipe(finalize(() => loadingService.setLoadingState(false)));
};

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./features/blog-overview-page/blog-overview-page.component').then(
        (c) => c.BlogOverviewPageComponent,
      ),
    resolve: { model: blogPostsResolver },
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./features/blog-detail-page/blog-detail-page.component').then(
        (c) => c.BlogDetailPageComponent,
      ),
    resolve: { model: blogDetailResolver },
  },
  {
    path: 'demo',
    loadComponent: () =>
      import('./features/demo/demo.component').then((c) => c.DemoComponent),
  },
];
