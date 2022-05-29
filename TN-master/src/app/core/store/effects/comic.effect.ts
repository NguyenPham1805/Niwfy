import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, tap, map } from 'rxjs';
import { ComicService } from 'src/app/shared/service/manga.service';
import { Comic } from 'src/app/shared/types/comic.interface';
import {
  getSlideComicsAction,
  getSlideComicsSuccessAction,
  getSlideComicsFailedAction,
} from '../actions/comic.action';

@Injectable()
export class ComicEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly csv: ComicService
  ) {}

  public getSlideComic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSlideComicsAction),
      switchMap(() => {
        return this.csv.getSlide().pipe(
          map((slideResponse) => {
            return getSlideComicsSuccessAction({ slideResponse });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getSlideComicsFailedAction({ error: errorResponse.error.error })
            );
          })
        );
      })
    )
  );
}
