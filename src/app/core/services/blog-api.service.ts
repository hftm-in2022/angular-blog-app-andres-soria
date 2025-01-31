import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, delay, map, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { z } from 'zod';
import { OidcSecurityService } from 'angular-auth-oidc-client';

const BlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  contentPreview: z.string(),
  author: z.string(),
  likes: z.number(),
  comments: z.number(),
  likedByMe: z.boolean(),
  createdByMe: z.boolean(),
  headerImageUrl: z.string().optional(),
});

const BlogArraySchema = z.array(BlogSchema);

const EntriesSchema = z.object({
  data: BlogArraySchema,
  pageIndex: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  maxPageSize: z.number(),
});

const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  author: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

const BlogDetailsSchema = BlogSchema.extend({
  updatedAt: z.string(),
  createdAt: z.string(),
  content: z.string(),
  author: z.string(),
  comments: z.array(CommentSchema),
}).partial({ contentPreview: true });

export type Blog = z.infer<typeof BlogSchema>;
export type Entries = z.infer<typeof EntriesSchema>;
export type BlogDetails = z.infer<typeof BlogDetailsSchema>;
export type Comment = z.infer<typeof CommentSchema>;

/**
 * Service to interact with the blog API.
 *
 * @remarks
 * This service provides methods to fetch all blog posts and fetch a specific blog post by its ID.
 *
 * @example
 * ```typescript
 * constructor(private blogApiService: BlogApiService) {}
 *
 * this.blogApiService.getAllPosts().subscribe(posts => {
 *   console.log(posts);
 * });
 *
 * this.blogApiService.getBlogById(1).subscribe(blog => {
 *   console.log(blog);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class BlogApiService {
  private httpClient = inject(HttpClient);
  private oidcSecurityService = inject(OidcSecurityService);
  private demoDelay = 200;

  /**
   * Creates an instance of BlogApiService.
   *
   * @param http - The HTTP client used to make requests.
   */
  constructor(private http: HttpClient) {} // 2x httpClient injected. einmal constructor injection und einmal inject function

  /**
   * Fetches all blog posts from the API.
   *
   * @returns An observable of the list of blog entries.
   */
  getAllPosts(): Observable<Entries> {
    return this.http.get<Entries>(`${environment.serviceUrl}/entries`).pipe(
      delay(1000),
      map((entries) => EntriesSchema.parse(entries)),
    );
  }

  /**
   * Fetches a specific blog post by its ID.
   *
   * @param blogId - The ID of the blog post to fetch.
   * @returns An observable of the blog post details.
   */
  getBlogById(blogId: number): Observable<BlogDetails> {
    return this.http
      .get<BlogDetails>(`${environment.serviceUrl}/entries/${blogId}`)
      .pipe(
        delay(this.demoDelay),
        map((blogDetails) => BlogDetailsSchema.parse(blogDetails)),
      );
  }

  /**
   * Adds a new blog post to the API.
   *
   * @param newBlog - The new blog post to add.
   * @returns An observable of the new blog post.
   */
  addBlog(blog: {
    title: string;
    content: string;
    headerImageUrl?: string;
  }): Observable<Blog> {
    return this.oidcSecurityService.getAccessToken().pipe(
      delay(this.demoDelay),
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`, // bearer Token kann durch den AuthInterceptor und secureRoutes definiert werden.
          'Content-Type': 'application/json',
        });
        return this.httpClient.post<Blog>(
          `${environment.serviceUrl}/entries`,
          blog,
          { headers },
        );
      }),
    );
  }

  /**
   * Updates an existing blog post in the API.
   *
   * @param id - The ID of the blog post to update.
   * @param updatedBlog - The updated blog post.
   * @returns An observable of the updated blog post.
   */
  updateBlog(
    blogId: number,
    blog: {
      title: string;
      content: string;
      headerImageUrl?: string;
    },
  ): Observable<Blog> {
    return this.oidcSecurityService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
        return this.httpClient.put<Blog>(
          `${environment.serviceUrl}/entries/${blogId}`,
          blog,
          { headers },
        );
      }),
    );
  }

  /**
   * Deletes a blog post from the API.
   *
   * @param blogId - The ID of the blog post to delete.
   * @returns An observable of the deleted blog post.
   */
  deleteBlog(blogId: number): Observable<void> {
    return this.oidcSecurityService.getAccessToken().pipe(
      delay(this.demoDelay),
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.httpClient.delete<void>(
          `${environment.serviceUrl}/entries/${blogId}`,
          { headers },
        );
      }),
    );
  }

  /**
   * Adds a new comment to a blog post.
   *
   * @param blogId - The ID of the blog post to add the comment to.
   * @param comment - The new comment to add.
   * @returns An observable of the new comment.
   */
  addComment(blogId: number, comment: string): Observable<Comment> {
    return this.oidcSecurityService.getAccessToken().pipe(
      delay(this.demoDelay),
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
        const body = { content: comment };
        return this.httpClient.post<Comment>(
          `${environment.serviceUrl}/entries/${blogId}/comments`,
          body,
          { headers },
        );
      }),
    );
  }

  /**
   * Toggles the liked status of a blog entry for the current user.
   *
   * @param blogId - The ID of the blog entry to toggle the liked status for.
   * @param likedByMe - A boolean indicating whether the blog entry is liked by the current user.
   * @returns An Observable that completes when the operation is finished.
   */
  toggleBlogEntryLiked(blogId: number, likedByMe: boolean): Observable<void> {
    return this.oidcSecurityService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
        const body = { likedByMe: likedByMe };
        return this.httpClient.put<void>(
          `${environment.serviceUrl}/entries/${blogId}/like-info`,
          body,
          { headers },
        );
      }),
    );
  }
}
