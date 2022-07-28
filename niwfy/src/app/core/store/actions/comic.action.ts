import { createAction, props } from '@ngrx/store';
import { Comic, HistoryComic } from 'src/app/shared/types/comic.interface';

export enum GetSlideComics {
  GET_SLIDE_COMICS = '@SlideComics/Get',
  GET_SLIDE_COMICS_SUCCESS = '@SlideComics/GetSuccess',
  GET_SLIDE_COMICS_FAILED = '@SlideComics/GetFailed',
}

export const getSlideComicsAction = createAction(
  GetSlideComics.GET_SLIDE_COMICS
);

export const getSlideComicsSuccessAction = createAction(
  GetSlideComics.GET_SLIDE_COMICS_SUCCESS,
  props<{ slideResponse: { comics: Comic[]; success: boolean } }>()
);

export const getSlideComicsFailedAction = createAction(
  GetSlideComics.GET_SLIDE_COMICS_FAILED,
  props<{ error: string }>()
);
