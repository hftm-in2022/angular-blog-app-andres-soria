import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { finalize, lastValueFrom } from 'rxjs';
import {
  BlogApiService,
  BlogDetails,
  Entries,
} from './core/services/blog-api.service';
import { LoadingStateService } from './core/services/loading-state.service';
import { AuthenticationGuard } from './core/auth/authentication.guard';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';

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
  // { path: '', pathMatch: 'full', component: NotFoundPageComponent },
  {
    path: '',
    loadComponent: () =>
      import('./features/blog-overview-page/blog-overview-page.component').then(
        (c) => c.BlogOverviewPageComponent,
      ),
    resolve: { model: blogPostsResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./features/blog-overview-page/blog-overview-page.component').then(
        (c) => c.BlogOverviewPageComponent,
      ),
    resolve: { model: blogPostsResolver },
    runGuardsAndResolvers: 'always',
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
    path: 'add-blog',
    loadComponent: () =>
      import('./features/add-blog-page/add-blog-page.component').then(
        (c) => c.AddBlogPageComponent,
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'demo',
    loadComponent: () =>
      import('./features/demo/demo.component').then((c) => c.DemoComponent),
  },
  { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
];
