import { createAction, props } from '@ngrx/store';
import { Message } from 'src/app/shared/types/message.interface';

export enum ToastAction {
  ADD_TOAST = '@Toast/add',
  REMOVE_TOAST = '@Toast/remove',
}

export const addToatAction = createAction(
  ToastAction.ADD_TOAST,
  props<{ message: Message }>()
);

export const removeToatAction = createAction(
  ToastAction.REMOVE_TOAST,
  props<{ index: number }>()
);
