import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { ComicService } from 'src/app/shared/service/manga.service';
import { ChapterData, ChapterLink } from 'src/app/shared/types/comic.interface';

@Component({
  selector: 'nf-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent implements OnInit, OnDestroy {
  public isSlideOpen: boolean = false;
  public followClicked: boolean = false;
  public isLoading: boolean = false;
  public indexActive!: number;

  public currentComicId!: number;
  public comicId!: number;
  public currentComicSlug!: string;
  public currentChapter$: Subject<ChapterData | null> = new Subject();
  public chapterLinks$!: Observable<{ success: boolean; links: ChapterLink[] }>;
  public error: boolean = false;

  constructor(
    private readonly csv: ComicService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap((params) => {
          this.error = false;
          this.currentChapter$.next(null);
          this.comicId = Number(params['id']);
          this.handleScrollTop();
          this.currentComicSlug = params['slug'];
          this.chapterLinks$ = this.csv.getChapterList(params['id']);
        }),
        switchMap((params) => {
          return this.activatedRoute.queryParams.pipe(
            switchMap((querys) => {
              this.isLoading = true;
              return this.csv.getChapter(
                params['id'],
                this.currentComicSlug,
                querys['chap'],
                querys['hashId']
              );
            }),
            tap(() => (this.isLoading = false)),
            catchError((error: HttpErrorResponse) => {
              return of(error.error);
            })
          );
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.currentChapter$.next(res.data);
          document.title =
            'Đọc truyện | ' + res.data.title + ' ' + res.data.chapterName;
        } else this.error = true;
      });
  }

  ngOnDestroy(): void {
    this.currentChapter$.complete();
  }

  public handleOpenSlide(i: number): void {
    this.handleNavSlide(i);
    this.isSlideOpen = true;
  }

  public handleCloseSlide(i: number): void {
    this.handleNavSlide(i);
    this.isSlideOpen = false;
    window.scrollTo({
      top: document.querySelectorAll<HTMLImageElement>('.chap img')[i]
        .offsetTop,
    });
  }

  public handleNavSlide(i: number): void {
    this.indexActive = i;
  }

  public handleScrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public handleChangeChapter(chap: ChapterLink): void {
    console.log(this.indexActive);
    this.router.navigate(
      ['comic/chapter', this.comicId, this.currentComicSlug],
      {
        queryParams: {
          chap: this.chapToSlug(chap?.name),
          hashId: chap?.hashId,
        },
      }
    );
    this.handleScrollTop();
  }

  private chapToSlug(value: string): string {
    const chap = value.split(' ')[1].replace(/[:;|\\?*%$#@!*&^()/\[\]]/g, '');
    return 'chap-' + chap;
  }
}
