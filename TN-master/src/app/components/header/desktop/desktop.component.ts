import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { filter, fromEvent, throttleTime, timer } from 'rxjs';

import { routes } from 'src/app/shared/header-routes';

@Component({
  selector: 'nf-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
})
export class DesktopComponent implements OnInit, AfterViewInit {
  public headerRoutes = routes;
  public abPosition!: number;
  public abWidth!: number;
  public path!: string;
  public navbarChange = false;
  public navbarToggle = false;

  private lastScrollTop = 0;
  private navItems!: NodeListOf<HTMLLIElement>;

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(
        filter((e): e is RouterEvent => e instanceof RouterEvent),
        throttleTime(0)
      )
      .subscribe((e: RouterEvent) => {
        this.path = e.url.split('/')[1];
      });
  }

  ngAfterViewInit(): void {
    this.navItems = document.querySelectorAll<HTMLLIElement>('.menu-item');
    this.navItems.forEach((item) => {
      fromEvent(item, 'mousemove').subscribe(() =>
        this.handleAnimationBar(item)
      );
      fromEvent(item, 'mouseleave').subscribe(() => this.handleActiveLi());
    });
    timer(0).subscribe(() => this.handleActiveLi());
  }

  ngOnInit(): void {
    fromEvent(window, 'scroll').subscribe(() => {
      this.scrollTop();
      this.scrollToggle();
    });
  }

  private scrollToggle(): void {
    if (window.pageYOffset >= 55) {
      let scrollTop = window.pageYOffset;
      this.navbarToggle = scrollTop >= this.lastScrollTop;
      this.lastScrollTop = scrollTop;
    }
  }

  private scrollTop(): void {
    if (window.pageYOffset > 0) this.navbarChange = true;
    else this.navbarChange = false;
  }

  private handleAnimationBar(item: HTMLLIElement): void {
    this.abWidth = item?.offsetWidth;
    this.abPosition = item?.offsetLeft;
  }

  private handleActiveLi(): void {
    const navItemActive =
      document.querySelector<HTMLLIElement>('.nav-item.active');
    this.abPosition = navItemActive?.offsetLeft || 0;
    this.abWidth = navItemActive?.offsetWidth || 0;
  }
}
