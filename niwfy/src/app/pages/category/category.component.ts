import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  scan,
  Subject,
  switchMap,
  take,
  takeUntil,
  of,
  tap,
  zip,
} from 'rxjs';
import { COUNTRIES, GENRES, Link, RANKINGS } from 'src/app/shared/constant';
import { ComicService } from 'src/app/shared/service/manga.service';
import { Comic } from 'src/app/shared/types/comic.interface';

@Component({
  selector: 'nf-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  public title: string = '';
  public comics$!: Observable<Comic[]>;
  public isLoading: boolean = false;
  public end: boolean = false;
  public error: boolean = false;

  private category!: string;
  private slug: string | null = null;
  private type: number | null = null;
  private currentPage$: BehaviorSubject<number> = new BehaviorSubject(1);
  private _comics$: BehaviorSubject<Comic[]> = new BehaviorSubject<Comic[]>([]);
  private destroy$: Subject<null> = new Subject();

  constructor(
    private readonly csv: ComicService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(() => {
          this.error = false;
          this._comics$.next([]);
          this.comics$ = this._comics$
            .asObservable()
            .pipe(scan((acc, val) => [...acc, ...val]));
        }),
        switchMap(() => {
          return zip([
            this.activatedRoute.params,
            this.activatedRoute.queryParams,
          ]).pipe(
            tap(([params, querys]) => {
              this.type = querys['type'];
              this.category = params['category'] as string;
              this.slug = params['slug'] as string;
            }),
            map(([params]) => {
              return {
                category: params['category'] as string,
                slug: params['slug'] as string,
              };
            }),
            tap(({ category, slug }) => {
              this.isLoading = true;
              let _category: string = '';
              let genre: Link;
              switch (category) {
                case 'genre':
                  _category = 'Thể loại';
                  genre = GENRES.find((genre) => genre.slug === slug)!;
                  break;
                case 'rank':
                  _category = 'Bảng xếp hạng';
                  genre = RANKINGS.find((genre) => genre.slug === slug)!;
                  break;
                case 'country':
                  _category = 'Quốc gia';
                  genre = COUNTRIES.find((genre) => genre.slug === slug)!;
                  break;
              }

              setTimeout(() => {
                if (_category && genre) {
                  this.title = _category + ' - ' + genre?.name;
                  document.title = this.title;
                }
              }, 0);
            }),
            switchMap(({ slug }) => {
              if (this.type) return this.csv.getRank(this.type, 1);
              return this.csv.getList(slug, 1);
            }),
            catchError((error: HttpErrorResponse) => {
              return of(error.error);
            }),
            take(1)
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        if (res.success) {
          this._comics$.next(res.comics);
        } else {
          this.error = true;
        }
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.currentPage$.complete();
  }

  public onScroll(): void {
    if (this.currentPage$.value === 1) {
      this.currentPage$
        .asObservable()
        .pipe(
          tap(() => (this.isLoading = true)),
          switchMap((currentPage) => {
            if (this.type) return this.csv.getRank(this.type, currentPage);
            return this.csv.getList(this.slug || this.category, currentPage);
          })
        )
        .subscribe((res) => {
          this.isLoading = false;
          if (this.currentPage$.value >= res.pagination.totalPage) {
            this.currentPage$.complete();
            this.end = true;
          }
          this._comics$.next(res.comics);
        });
    }
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  public scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
