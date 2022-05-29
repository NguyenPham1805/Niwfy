import { createReducer, on } from '@ngrx/store';
import * as ComicAction from 'src/app/core/store/actions/comic.action';
import { ComicState } from 'src/app/shared/types/comic.interface';

const comicState: ComicState = {
  slide: {
    success: null,
    comics: null,
  },
  search: null,
  history: null,
  loading: false,
  error: '',
};

export const comicReducer = createReducer(
  comicState,
  on(
    ComicAction.getSlideComicsAction,
    (state): ComicState => ({
      ...state,
      loading: true,
    })
  ),
  on(
    ComicAction.getSlideComicsSuccessAction,
    (state, action): ComicState => ({
      ...state,
      slide: action.slideResponse,
      loading: false,
      error: '',
    })
  ),
  on(
    ComicAction.getSlideComicsFailedAction,
    (state, action): ComicState => ({
      ...state,
      loading: false,
      error: action.error,
    })
  ),
  on(
    ComicAction.getSlideComicsFailedAction,
    (state, action): ComicState => ({
      ...state,
      loading: false,
      error: action.error,
    })
  ),
  on(
    ComicAction.getHistoryComicsAction,
    (state): ComicState => ({
      ...state,
      loading: true,
      error: '',
    })
  ),
  on(
    ComicAction.getHistoryComicsSuccessAction,
    (state, action): ComicState => ({
      ...state,
      history: action.historyResponse,
      loading: false,
    })
  )
);
