import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ListComponent } from './list.component';
import { PipesModule } from 'src/app/shared/pipe/pipes.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    LazyLoadImageModule,
    MatIconModule,
  ],
  exports: [ListComponent],
})
export class ListModule {}
