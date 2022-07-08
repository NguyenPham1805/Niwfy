import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToatAction } from 'src/app/core/store/actions/toast.action';
import { InfoResponse } from 'src/app/shared/types/comic.interface';

@Component({
  selector: 'nf-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss'],
})
export class InfoContainerComponent implements OnInit {
  public isSeeMore: boolean = true;
  public isHasMore: boolean = false;
  public isLoading: boolean = false;

  @Input('dark-theme') isDarkTheme: boolean | null = true;
  @Input() info!: InfoResponse;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.isHasMore = this.info?.content.length > 300;
  }

  public handleAction(): void {
    this.store.dispatch(
      addToatAction({
        message: {
          content:
            'Tính năng này chưa làm nhưng ad vẫn bỏ vô cho vui, có gì update sau, ae chờ ad nhé!!',
          type: 'info',
        },
      })
    );
  }
}
