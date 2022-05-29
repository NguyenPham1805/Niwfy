import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ChapterLink,
  ChapterResponse,
  Comic,
  ComicResponse,
  InfoResponse,
  SearchResponse,
} from '../types/comic.interface';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private http: HttpClient) {}

  public getSlide(): Observable<{ success: boolean; comics: Comic[] }> {
    return this.http.get<{ success: boolean; comics: Comic[] }>(
      `${environment.niwfyApiUrl}/slide`
    );
  }

  public getHome(page: number): Observable<ComicResponse> {
    return this.http.get<ComicResponse>(`${environment.niwfyApiUrl}/home`, {
      params: { page },
    });
  }

  public getList(slug: string, page: number): Observable<ComicResponse> {
    return this.http.get<ComicResponse>(
      `${environment.niwfyApiUrl}/genre/${slug}`,
      { params: { page } }
    );
  }

  public getRank(query: number, page: number): Observable<ComicResponse> {
    return this.http.get<ComicResponse>(`${environment.niwfyApiUrl}/rank`, {
      params: { type: query, page },
    });
  }

  public getFinish(page: number = 1): Observable<ComicResponse> {
    return this.http.get<ComicResponse>(`${environment.niwfyApiUrl}/finish`, {
      params: { page },
    });
  }

  public getInfo(slug: string): Observable<InfoResponse> {
    return this.http.get<InfoResponse>(
      `${environment.niwfyApiUrl}/comic/${slug}`
    );
  }

  public getSearch(q: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${environment.niwfyApiUrl}/search`, {
      params: { q },
    });
  }

  public getChapterList(
    id: number
  ): Observable<{ success: boolean; links: ChapterLink[] }> {
    if (Number(id) % 10 === 0) {
      id = id / 10;
    }
    return this.http.get<{ success: boolean; links: ChapterLink[] }>(
      `${environment.niwfyApiUrl}/chapter-link/${id}`
    );
  }

  public getChapter(
    id: number,
    slug: string,
    chap: string,
    hash: number
  ): Observable<ChapterResponse> {
    if (Number(id) % 10 === 0) {
      id = id / 10;
    }
    return this.http.get<ChapterResponse>(
      `${environment.niwfyApiUrl}/chapter/${id}/${slug}/${chap}/${hash}`
    );
  }
}
