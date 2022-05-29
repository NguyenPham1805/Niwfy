import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pluck, Subject, takeUntil, tap } from 'rxjs';
import { themeSelector } from 'src/app/core/store/selectors/user.selector';
import { ChapterLink } from 'src/app/shared/types/comic.interface';

@Component({
  selector: 'nf-sidebar-chaps',
  templateUrl: './sidebar-chaps.component.html',
  styleUrls: ['./sidebar-chaps.component.scss'],
})
export class SidebarChapsComponent implements OnInit, OnDestroy {
  public isOpen = false;
  public isDarkTheme$!: Observable<boolean>;
  public indexActive!: number;
  private destroy$: Subject<null> = new Subject();

  @Input() link!: string;
  @Input() title?: string;
  @Input('links') chapLinks?: ChapterLink[] = [];
  @Output('change-chapter') onChangeChapter = new EventEmitter<ChapterLink>();

  constructor(
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isDarkTheme$ = this.store.select(themeSelector);
    this.activatedRoute.queryParams
      .pipe(
        pluck('hashId'),
        tap((id) => {
          setTimeout(() => {
            this.getChapterIndexActive(this.chapLinks!, id);
          }, 0);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public handleChangeChapter(chap: ChapterLink): void {
    this.onChangeChapter.emit(chap);
  }

  private getChapterIndexActive(
    links: ChapterLink[],
    currentHashId: number
  ): void {
    for (let i = 0; i < links?.length; i++) {
      if (links[i].hashId === Number(currentHashId)) {
        this.indexActive = i;
        break;
      }
    }
  }
}
