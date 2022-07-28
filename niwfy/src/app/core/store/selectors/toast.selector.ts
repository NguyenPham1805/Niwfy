import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Message } from 'src/app/shared/types/message.interface';

const toastFeatureSelector = createFeatureSelector<Message[]>('toast');

export const toastSelector = createSelector(
  toastFeatureSelector,
  (toastState: Message[]) => toastState
);
