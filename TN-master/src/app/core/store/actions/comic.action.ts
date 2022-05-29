import { createAction, props } from '@ngrx/store';
import {
  Comic,
  HistoryComic,
  SearchResponse,
} from 'src/app/shared/types/comic.interface';

export enum GetSlideComics {
  GET_SLIDE_COMICS = '@SlideComics/Get',
  GET_SLIDE_COMICS_SUCCESS = '@SlideComics/GetSuccess',
  GET_SLIDE_COMICS_FAILED = '@SlideComics/GetFailed',
}

export enum GetHistoryComics {
  GET_HISTORY_COMICS = '@Comics/GetHistory',
  GET_HISTORY_COMICS_SUCCESS = '@Comics/GetHistorySuccess',
  GET_HISTORY_COMICS_FAILED = '@Comics/GetHistoryFailed',
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

export const getHistoryComicsAction = createAction(
  GetHistoryComics.GET_HISTORY_COMICS
);

export const getHistoryComicsSuccessAction = createAction(
  GetHistoryComics.GET_HISTORY_COMICS_SUCCESS,
  props<{ historyResponse: HistoryComic[] }>()
);

export const getHistoryComicsFailedAction = createAction(
  GetHistoryComics.GET_HISTORY_COMICS_FAILED,
  props<{ error: string }>()
);
