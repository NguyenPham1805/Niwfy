export interface Comic {
  id: string;
  title: string;
  thumbnail: string;
  slug: string;
  views?: string;
  follows?: string;
  chapLatest: Chapter;
}

export interface SearchResponse {
  name: string;
  slug: string;
  thumbnail: string;
  chapLatest: string;
  intro?: string;
  genres: string[];
}

export interface Chapter {
  name: string;
  hashId: number;
  timeLeft?: string;
  views?: string;
}

export interface InfoResponse {
  title: string;
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
  title: string;
  id: string;
  comics: string[];
  chapters: Chapter[];
}
