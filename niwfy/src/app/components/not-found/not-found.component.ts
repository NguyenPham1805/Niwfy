import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, map, Subscription } from 'rxjs';

@Component({
  selector: 'nf-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  @ViewChild('container') container!: ElementRef;
  private mousemoveEvents$!: Subscription;
  private prevRoute?: string = '';

  constructor(private readonly router: Router) {
    this.prevRoute = router
      .getCurrentNavigation()
      ?.previousNavigation?.finalUrl?.toString();
  }

  ngOnInit(): void {
    document.title = 'niwfy 404 | Not Found';

    this.mousemoveEvents$ = fromEvent(document, 'mousemove')
      .pipe(map((e) => e as MouseEvent))
      .subscribe((e) => {
        let x = e.clientX / 5;
        let y = e.clientY / 5;
        this.container.nativeElement.style.backgroundPositionX = x + 'px';
        this.container.nativeElement.style.backgroundPositionY = y + 'px';
      });
  }

  ngOnDestroy(): void {
    this.mousemoveEvents$.unsubscribe();
  }

  public handleReturn() {
    this.router.navigate([this.prevRoute || '']);
  }
}
