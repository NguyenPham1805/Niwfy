import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, tap } from 'rxjs';
import { getSlideComicsAction } from 'src/app/core/store/actions/comic.action';
import {
  comicLoadingSelector,
  slideSelector,
} from 'src/app/core/store/selectors/comic.selector';
import { Comic } from 'src/app/shared/types/comic.interface';

@Component({
  selector: 'nf-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  public slides$!: Observable<{
    success: boolean | null;
    comics: Comic[] | null;
  }>;
  public isLoading$: Observable<boolean> | null = null;

  @Input('dark-theme') isDarkTheme: boolean | null = true;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading$ = this.store.select(comicLoadingSelector);
    }, 0);

    this.slides$ = this.store.select(slideSelector).pipe(
      tap((slides) => {
        if (slides.success === null)
          this.store.dispatch(getSlideComicsAction());
      })
    );
  }

  public customOptions: OwlOptions = {
    loop: true,
    margin: 15,
    touchDrag: true,
    mouseDrag: true,
    autoplay: true,
    center: true,
    dots: true,
    navSpeed: 500,
    nav: true,
    navText: [
      '<span class="material-icons-outlined">arrow_back_ios</span>',
      '<span class="material-icons-outlined">arrow_forward_ios</span>',
    ],
    responsive: {
      950: {
        items: 5,
      },
      750: {
        items: 4,
      },
      500: {
        items: 3,
      },
      0: {
        items: 2,
      },
    },
  };
}
