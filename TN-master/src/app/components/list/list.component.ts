import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { themeSelector } from 'src/app/core/store/selectors/user.selector';
import { Comic } from 'src/app/shared/types/comic.interface';

@Component({
  selector: 'nf-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public isDarkTheme$!: Observable<boolean>;

  @Input() list!: Comic[] | null;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.isDarkTheme$ = this.store.select(themeSelector);
  }

  public trackById(_: any, comic: Comic) {
    return comic.id;
  }
}
