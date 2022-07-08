import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { TitleModule } from 'src/app/components/title/title.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HistoryRoutingModule } from './history-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DailogModule } from 'src/app/components/dailog/dailog.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PipesModule } from 'src/app/shared/pipe/pipes.module';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    TitleModule,
    FormsModule,
    LazyLoadImageModule,
    DailogModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    HistoryRoutingModule,
    InfiniteScrollModule,
    PipesModule,
  ],
})
export class HistoryModule {}
