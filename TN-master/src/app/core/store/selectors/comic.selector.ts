import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ComicState } from 'src/app/shared/types/comic.interface';

const comicFeatureSelector = createFeatureSelector<ComicState>('comic');

export const slideSelector = createSelector(
  comicFeatureSelector,
  (state) => state.slide
);

export const comicLoadingSelector = createSelector(
  comicFeatureSelector,
  (state) => state.loading
);

export const slideErrorSelector = createSelector(
  comicFeatureSelector,
  (state) => state.error
);

export const historySelector = createSelector(
  comicFeatureSelector,
  (state) => state.history
);
