import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, pluck, switchMap, tap, zip } from 'rxjs';
import { addToatAction } from 'src/app/core/store/actions/toast.action';
import {
  currentUserSelector,
  themeSelector,
} from 'src/app/core/store/selectors/user.selector';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { ComicService } from 'src/app/shared/service/manga.service';
import { InfoResponse } from 'src/app/shared/types/comic.interface';
import { CurrentUser } from 'src/app/shared/types/user.interface';

@Component({
  selector: 'nf-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  public isLoading: boolean = true;
  public isError: boolean = false;
  public isDarkTheme$!: Observable<boolean>;
  public user!: CurrentUser | null;
  public info!: InfoResponse;

  constructor(
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
    private readonly csv: ComicService,
    private readonly fs: FirebaseService
  ) {}

  ngOnInit(): void {
    this.isDarkTheme$ = this.store.select(themeSelector);

    this.store
      .select(currentUserSelector)
      .pipe(
        tap((user) => (this.user = user)),
        switchMap(() => {
          return this.activatedRoute.params.pipe(
            tap(() => {
              this.isLoading = true;
              this.isError = false;
            }),
            pluck('slug'),
            switchMap((slug) => this.csv.getInfo(slug)),
            catchError((error: HttpErrorResponse) => {
              return of(error.error);
            })
          );
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.info = res;
          document.title = 'niwfy | ' + res.title;

          if (this.user) {
            this.fs.addHistory(
              {
                comicId: res.id,
                title: res.title,
                thumb_url: res.thumbnail,
                slug: res.slug,
                chapReadLastest: {
                  name: res.chapters[res.chapters?.length - 1]?.name || null,
                  hashId:
                    res.chapters[res.chapters?.length - 1]?.hashId || null,
                },
                tag: res.genres,
                createdAt: new Date() as unknown as {
                  nanoseconds: number;
                  seconds: number;
                },
              },
              this.user.uid
            );
          }
        } else {
          this.isError = true;
          this.store.dispatch(
            addToatAction({
              message: {
                content: 'Trên web không có link này đâu má :|',
                type: 'error',
              },
            })
          );
        }
        this.isLoading = false;
      });
  }
}
function serverTimestamp(): string | Date {
  throw new Error('Function not implemented.');
}
