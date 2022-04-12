import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Chapter,
  Comic,
  InfoResponse,
  SearchResponse,
} from '../types/manga.interface';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  constructor(private http: HttpClient) {}

  public getList(category: string, slug: string): Observable<Comic[]> {
    return this.http.get<Comic[]>(
      `${environment.niwfyApiUrl}/${category}/${slug}`
    );
  }

  public getInfo(slug: string): Observable<InfoResponse> {
    return this.http.get<InfoResponse>(
      `${environment.niwfyApiUrl}/comic/${slug}`
    );
  }

  public getSearch(q: string): Observable<SearchResponse[]> {
    return this.http.get<SearchResponse[]>(
      `${environment.niwfyApiUrl}/search`,
      {
        params: { q },
      }
    );
  }

  public getChapterList(id: string): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${environment.niwfyApiUrl}/${id}`);
  }

  public getChapter(
    slug: string,
    chap: string,
    hash: number
  ): Observable<Chapter> {
    return this.http.get<Chapter>(
      `${environment.niwfyApiUrl}/${slug}/${chap}/${hash}`
    );
  }
}
