import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  map,
  Observable,
  of,
  pluck,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { themeSelector } from 'src/app/core/store/selectors/user.selector';
import { ComicService } from 'src/app/shared/service/manga.service';
import { Comic } from 'src/app/shared/types/comic.interface';

@Component({
  selector: 'nf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [],
})
export class HomeComponent implements OnInit, OnDestroy {
  public currentPage!: number;
  public totalPage!: number;
  public title: string = 'Mới cập nhật';
  public darkTheme$!: Observable<boolean>;
  public home: Comic[] | null = null;
  public isLoading: boolean = false;
  public error$!: Observable<string>;
  private destroy$ = new Subject();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store,
    private readonly csv: ComicService
  ) {}

  ngOnInit(): void {
    this.darkTheme$ = this.store.select(themeSelector);
    this.activatedRoute.queryParams
      .pipe(
        tap(() => (this.isLoading = true)),
        pluck('page'),
        map((page) => Number(page) as number),
        tap((page) => {
          this.currentPage = this.checkPage(page || 1);
          if (page) {
            this.title = 'Trang ' + page;
            document.title = 'niwfy | Mới cập nhật - ' + this.title;
            window.scroll({ top: 400, behavior: 'smooth' });
          }
        }),
        switchMap((page) => this.csv.getHome(page || 1)),
        catchError((error: HttpErrorResponse) => of(error.error)),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        if (!res.success) {
          this.error$ = of('Not found');
          return;
        }
        this.home = res.comics;
        this.currentPage = res.pagination.currentPage;
        this.totalPage = res.pagination.totalPage;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public handleChagePage(page: number): void {
    this.router.navigate([''], {
      queryParams: { page: this.checkPage(page) },
    });
  }

  public checkPage(page: number): number {
    if (page < 1) page = 1;
    else if (page > this.totalPage) page = this.totalPage;
    this.currentPage = page;
    return page;
  }
}
