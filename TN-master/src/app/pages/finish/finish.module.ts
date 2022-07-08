import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ListSkeletonModule } from 'src/app/components/list-skeleton/list-skeleton.module';
import { ListModule } from 'src/app/components/list/list.module';
import { TitleModule } from 'src/app/components/title/title.module';
import { DirectivesModule } from 'src/app/shared/directive/directives.module';
import { FinishRoutingModule } from './finish-routing.module';
import { FinishComponent } from './finish.component';

@NgModule({
  declarations: [FinishComponent],
  imports: [
    CommonModule,
    FinishRoutingModule,
    TitleModule,
    ListModule,
    ListSkeletonModule,
    InfiniteScrollModule,
    MatIconModule,
    DirectivesModule,
  ],
})
export class FinishModule {}
