import { Message } from 'src/app/shared/types/message.interface';
import { createReducer, on } from '@ngrx/store';
import * as ToastAction from 'src/app/core/store/actions/toast.action';

const toastState: Message[] = [];

export const toastReducer = createReducer(
  toastState,
  on(ToastAction.addToatAction, (state, action) => [...state, action.message]),
  on(ToastAction.removeToatAction, (state, action) =>
    state.filter((_, index) => index !== action.index)
  )
);
