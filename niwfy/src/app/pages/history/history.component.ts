import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, scan, switchMap } from 'rxjs';
import { DailogComponent } from 'src/app/components/dailog/dailog.component';
import { addToatAction } from 'src/app/core/store/actions/toast.action';
import {
  currentUserSelector,
  themeSelector,
} from 'src/app/core/store/selectors/user.selector';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { HistoryComic } from 'src/app/shared/types/comic.interface';
import { CurrentUser } from 'src/app/shared/types/user.interface';

@Component({
  selector: 'nf-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  public isLoading: boolean = true;
  public keyword: string = '';
  public historyList!: HistoryComic[];
  public isDarkTheme$!: Observable<boolean>;
  public user: CurrentUser | null = null;
  private offset$ = new BehaviorSubject<number>(0);
  private _historyList$ = new BehaviorSubject<HistoryComic[]>([]);

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly fs: FirebaseService
  ) {}

  ngOnInit(): void {
    document.title = 'niwfy | lịch sử đã xem';

    this.isDarkTheme$ = this.store.select(themeSelector);

    this._historyList$
      .asObservable()
      .pipe(scan((acc, val) => [...acc, ...val]))
      .subscribe((history) => (this.historyList = history));

    this.store
      .select(currentUserSelector)
      .pipe(
        switchMap((user) => {
          if (!user) return of(null);
          this.isLoading = true;
          this.user = user;
          return this.offset$.asObservable().pipe(
            switchMap((offset) => {
              return this.fs.getHistory(user.uid, offset);
            })
          );
        })
      )
      .subscribe((snapshot) => {
        if (!snapshot) return;
        const history = snapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        this._historyList$.next(history);
        if (snapshot.size <= this.historyList.length) {
          this.offset$.complete();
          this._historyList$.complete();
        }
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.offset$.complete();
    this._historyList$.complete();
  }

  public handleOpenDialog(): void {
    this.dialog
      .open(DailogComponent, {
        width: '300px',
      })
      .afterClosed()
      .subscribe(() => {
        this.store.dispatch(
          addToatAction({
            message: {
              content:
                'Chưa có tính năng này nhá ae, bỏ vô cho nó đẹp thôi, bữa nào update cho nhé :)',
              type: 'info',
            },
          })
        );
      });
  }

  public handleRemoveOne(id: string): void {
    if (!this.user) return;
    this.historyList = this.historyList.filter(
      (history) => history.comicId !== id
    );
    this.fs
      .deleteOneHistory(this.user.uid, id)
      .then(() => {
        this.store.dispatch(
          addToatAction({
            message: {
              content: 'Xóa thành công!',
              type: 'success',
            },
          })
        );
      })
      .catch(() => {
        this.store.dispatch(
          addToatAction({
            message: {
              content: 'Đã có lỗi xảy ra, vui lòng thử lại!',
              type: 'error',
            },
          })
        );
      });
  }

  public handleSubmit(): void {
    this.store.dispatch(
      addToatAction({
        message: {
          content:
            'Chưa có tính năng này nhá ae, bỏ vô cho nó đẹp thôi, bữa nào update cho nhé :)',
          type: 'info',
        },
      })
    );
  }

  public handleScroll(): void {
    this.offset$.next(this.historyList.length - 1);
  }

  public trackById(_: number, history: HistoryComic): string {
    return history.comicId;
  }
}
