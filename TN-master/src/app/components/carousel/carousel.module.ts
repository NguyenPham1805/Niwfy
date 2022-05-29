import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TitleModule } from '../title/title.module';
import { CarouselComponent } from './carousel.component';

@NgModule({
  declarations: [CarouselComponent],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule,
    LazyLoadImageModule,
    TitleModule,
  ],
  exports: [CarouselComponent],
})
export class CarouselBannerModule {}
