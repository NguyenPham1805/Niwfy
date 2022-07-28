export interface Message {
  content: string;
  type: 'error' | 'warning' | 'info' | 'success';
}

export interface CommentResponse {
  commentId?: string;
  comicId: number;
  uid: string;
  content: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
  reaction?: {
    [key: string]: number;
  };
  img: string | null;
}

export interface CommentItem {
  commentId?: string;
  uid: string;
  content: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
  reaction?: {
    [key: string]: number;
  };
  img: string | null;
}
