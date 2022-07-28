import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { fromEvent } from 'rxjs';
import { CurrentUser } from 'src/app/shared/types/user.interface';

@Component({
  selector: 'nf-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent implements OnInit {
  public navbarChange = false;
  public navbarToggle = false;

  private lastScrollTop = 0;

  @Input() user: CurrentUser | null = null;
  @Input('dark-theme') isDarkTheme: boolean = true;

  @Output('open-menu') onMenuOpen = new EventEmitter();
  @Output('open-search') onSearchOpen = new EventEmitter();
  @Output('change-theme') onChangeTheme = new EventEmitter<boolean>();

  ngOnInit(): void {
    fromEvent(window, 'scroll').subscribe(() => {
      this.scrollTop();
      this.scrollToggle();
    });
  }

  private scrollToggle(): void {
    if (window.pageYOffset >= 50) {
      let scrollTop = window.pageYOffset;
      this.navbarToggle = scrollTop >= this.lastScrollTop;
      this.lastScrollTop = scrollTop;
    }
  }

  private scrollTop(): void {
    if (window.pageYOffset > 0) this.navbarChange = true;
    else this.navbarChange = false;
  }
}
