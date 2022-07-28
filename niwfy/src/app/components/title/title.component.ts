import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { themeSelector } from 'src/app/core/store/selectors/user.selector';

@Component({
  selector: 'nf-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  public isDarkTheme$!: Observable<boolean>;

  @Input() title!: string;
  @Input() description!: string;
  @Input('loading') isLoading: boolean | null = false;
  @Input('slide-duration') durationSlide: string = '3s';

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.isDarkTheme$ = this.store.select(themeSelector);
  }
}
