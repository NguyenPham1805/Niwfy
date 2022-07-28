import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselBannerModule } from 'src/app/components/carousel/carousel.module';
import { ListModule } from 'src/app/components/list/list.module';
import { TitleModule } from 'src/app/components/title/title.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { DirectivesModule } from 'src/app/shared/directive/directives.module';
import { NotFoundModule } from 'src/app/components/not-found/not-found.module';
import { ListSkeletonModule } from 'src/app/components/list-skeleton/list-skeleton.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TitleModule,
    CarouselBannerModule,
    ListModule,
    PaginationModule,
    DirectivesModule,
    NotFoundModule,
    ListSkeletonModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
