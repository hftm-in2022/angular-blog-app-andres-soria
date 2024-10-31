export interface BlogPostPreviewResponse {
  data: BlogPostPreview[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  maxPageSize: number;
}

export interface BlogPostPreview {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  title: string;
  contentPreview: string;
  author: string;
  likes: number;
  comments: number;
  likedByMe: boolean;
  createdByMe: boolean;
  headerImageUrl: string;
}
