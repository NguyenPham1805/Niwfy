import { Component, Input } from '@angular/core';
import { InfoResponse } from 'src/app/shared/types/comic.interface';

@Component({
  selector: 'nf-list-chap',
  templateUrl: './list-chap.component.html',
  styleUrls: ['./list-chap.component.scss'],
})
export class ListChapComponent {
  public isLoading: boolean = false;

  @Input() info!: InfoResponse;
  @Input('dark-theme') isDarkTheme: boolean | null = true;
}
