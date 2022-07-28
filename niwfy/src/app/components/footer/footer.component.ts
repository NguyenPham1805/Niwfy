import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { themeSelector } from 'src/app/core/store/selectors/user.selector';

@Component({
  selector: 'nf-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public darkTheme$!: Observable<boolean>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.darkTheme$ = this.store.select(themeSelector);
  }

  public scrollToTop(): void {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}
