import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ListSkeletonModule } from 'src/app/components/list-skeleton/list-skeleton.module';
import { ListModule } from 'src/app/components/list/list.module';
import { NotFoundModule } from 'src/app/components/not-found/not-found.module';
import { TitleModule } from 'src/app/components/title/title.module';
import { DirectivesModule } from 'src/app/shared/directive/directives.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    TitleModule,
    ListModule,
    InfiniteScrollModule,
    MatIconModule,
    ListSkeletonModule,
    DirectivesModule,
    NotFoundModule,
  ],
})
export class CategoryModule {}
