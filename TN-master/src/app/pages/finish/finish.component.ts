import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, scan, switchMap, tap } from 'rxjs';
import { ComicService } from 'src/app/shared/service/manga.service';
import { Comic } from 'src/app/shared/types/comic.interface';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit {
  public comics$!: Observable<Comic[]>;
  public isLoading: boolean = false;
  public end: boolean = false;

  private currentPage$: BehaviorSubject<number> = new BehaviorSubject(1);
  private _comics$ = new BehaviorSubject<Comic[]>([]);

  constructor(private readonly csv: ComicService) {}

  ngOnInit(): void {
    this.comics$ = this._comics$
      .asObservable()
      .pipe(scan((acc, val) => [...acc, ...val]));
    document.title = 'Truyện hoành thành';
  }

  public onScroll(): void {
    if (this.currentPage$.value === 1) {
      this.currentPage$
        .asObservable()
        .pipe(
          tap(() => (this.isLoading = true)),
          switchMap((currentPage) => {
            return this.csv.getFinish(currentPage);
          })
        )
        .subscribe((res) => {
          this.isLoading = false;
          if (this.currentPage$.value >= res.pagination.totalPage) {
            this.currentPage$.complete();
            this.end = true;
          }
          this._comics$.next(res.comics);
        });
    }
    this.currentPage$.next(this.currentPage$.value + 1);
  }
}
