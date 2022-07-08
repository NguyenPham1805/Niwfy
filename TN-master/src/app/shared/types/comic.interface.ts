import { Link } from '../constant';

export interface Comic {
  id: string;
  title: string;
  thumbnail: string;
  slug: string;
  views?: string;
  follows?: string;
  chapLatest: Chapter[];
}

export interface ComicResponse {
  success: boolean;
  comics: Comic[];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
}

export interface SearchResponse {
  success: boolean;
  comics: {
    name: string;
    slug: string;
    thumbnail: string;
    chapLatest: string;
    intro?: string;
    genres: string[];
  }[];
}

export interface Chapter {
  name: string;
  hashId: number;
  timeLeft?: string;
  views?: string;
}

export interface ChapterLink {
  name: string;
  hashId: number;
}

export interface InfoResponse {
  success: boolean;
  title: string;
  id: number | number;
  slug: string;
  status: string;
  thumbnail: string;
  specialName?: string;
  author?: string;
  updatedAt: string;
  views: string;
  rating: string;
  reviews: number;
  follows: string;
  content: string;
  genres: {
    name: string;
    slug: string;
  }[];
  chapters: Chapter[];
}

export interface ChapterResponse {
  success: boolean;
  data: ChapterData;
}

export interface ChapterData {
  title: string;
  id: string;
  updateAt: string;
  chapterName: string;
  comics: string[];
}

export interface HistoryComic {
  docId?: string;
  comicId: string;
  title: string;
  thumb_url: string;
  slug: string;
  chapReadLastest: {
    name: string;
    hashId: string;
  };
  tag: Link[];
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
}

export interface ComicState {
  slide: {
    success: boolean | null;
    comics: Comic[] | null;
  };
  loading: boolean;
  error: string;
}
