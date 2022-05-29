import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.isHasMore = this.info?.content.length > 300;
    document.title = 'Thông tin | ' + this.info?.specialName;
  }
}
