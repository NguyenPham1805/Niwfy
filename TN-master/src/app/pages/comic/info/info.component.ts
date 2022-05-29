import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, pluck, switchMap, tap } from 'rxjs';
import { themeSelector } from 'src/app/core/store/selectors/user.selector';
import { ComicService } from 'src/app/shared/service/manga.service';
import { InfoResponse } from 'src/app/shared/types/comic.interface';

@Component({
  selector: 'nf-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  public isLoading: boolean = false;
  public isError: boolean = false;
  public isDarkTheme$!: Observable<boolean>;
  public info!: InfoResponse;

  constructor(
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
    private readonly csv: ComicService
  ) {}

  ngOnInit(): void {
    this.isDarkTheme$ = this.store.select(themeSelector);

    this.activatedRoute.params
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.isError = false;
        }),
        pluck('slug'),
        switchMap((slug) => this.csv.getInfo(slug)),
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        }),
        tap(() => (this.isLoading = false))
      )
      .subscribe((res) => {
        if (res.success) {
          this.info = res;
        } else {
          this.isError = true;
        }
        this.isLoading = false;
      });
  }
}
