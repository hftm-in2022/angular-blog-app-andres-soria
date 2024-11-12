import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import {
  BlogApiService,
  BlogDetails,
  Entries,
} from './core/services/blog-api.service';

export const blogPostsResolver: ResolveFn<Entries> = async () => {
  const blogApiService = inject(BlogApiService);
  return await lastValueFrom(blogApiService.getAllPosts());
};

export const blogDetailResolver: ResolveFn<BlogDetails> = (route) => {
  const blogApiService = inject(BlogApiService);
  const idParam = route.paramMap.get('id');
  const blogId = Number(idParam);
  return blogApiService.getBlogById(blogId);
};

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadChildren: () =>
      import('./features/blog-overview-page/blog-overview-page.routes'),
    resolve: { model: blogPostsResolver },
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./features/blog-detail-page/blog-detail-page.routes'),
  },
  {
    path: 'demo',
    loadChildren: () => import('./features/demo/demo.routes'),
  },
];
