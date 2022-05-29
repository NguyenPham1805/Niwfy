import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, debounceTime, switchMap, tap } from 'rxjs';
import { ComicService } from 'src/app/shared/service/manga.service';
import { SearchResponse } from 'src/app/shared/types/comic.interface';

@Component({
  selector: 'nf-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public isType: boolean = false;
  public isNotFound: boolean = false;
  public search$: BehaviorSubject<string> = new BehaviorSubject('');
  public searchResponse: SearchResponse | null = null;

  @Output('close') onSearchOpen = new EventEmitter();
  @Input() isOpen!: boolean;
  @Input('dark-theme') isDarkTheme: boolean = true;

  constructor(private readonly csv: ComicService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.search$.complete();
  }

  public handleClearInput(): void {
    this.search$.next('');
    this.isLoading = false;
  }

  public handleInput(e: Event): void {
    this.search$
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.isType = true;
          this.isNotFound = false;
        }),
        debounceTime(500),
        switchMap((keyword) => this.csv.getSearch(keyword)),
        tap(() => {
          this.isType = false;
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        if (res.success && res.comics?.length) this.searchResponse = res;
        else this.isNotFound = true;
      });
    const keyword = (e.target as HTMLInputElement).value.trim().toLowerCase();
    if (keyword.length === 0) return;
    this.search$.next(keyword);
  }
}
