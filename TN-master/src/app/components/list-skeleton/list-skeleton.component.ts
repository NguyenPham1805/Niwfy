import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { themeSelector } from 'src/app/core/store/selectors/user.selector';

@Component({
  selector: 'nf-list-skeleton',
  templateUrl: './list-skeleton.component.html',
  styleUrls: ['./list-skeleton.component.scss'],
})
export class ListSkeletonComponent implements OnInit {
  public isDarkTheme$!: Observable<boolean>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.isDarkTheme$ = this.store.select(themeSelector);
  }
}
