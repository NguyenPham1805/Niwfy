import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ComicEffect } from './store/effects/comic.effect';
import { comicReducer } from './store/reducers/comic.reducer';
import { toastReducer } from './store/reducers/toast.reducer';
import { userReducer } from './store/reducers/user.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('comic', comicReducer),
    StoreModule.forFeature('user', userReducer),
    StoreModule.forFeature('toast', toastReducer),
    EffectsModule.forFeature([ComicEffect]),
  ],
})
export class CoreModule {}
