import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPostPreviewResponse } from '../models/blog-post-preview.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogApiService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<BlogPostPreviewResponse> {
    return this.http.get<BlogPostPreviewResponse>(
      `${environment.serviceUrl}/entries`,
    );
  }

  // Missing methods: getPostById, createPost, updatePost, deletePost
}
