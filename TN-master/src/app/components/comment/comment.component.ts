import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';

import {
  from,
  mergeMap,
  of,
  Subject,
  switchMap,
  map,
  zip,
  reduce,
  BehaviorSubject,
  takeUntil,
  Observable,
  tap,
  take,
} from 'rxjs';
import { addToatAction } from 'src/app/core/store/actions/toast.action';
import { currentUserSelector } from 'src/app/core/store/selectors/user.selector';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { CommentItem } from 'src/app/shared/types/message.interface';
import { CurrentUser } from 'src/app/shared/types/user.interface';

@Component({
  selector: 'nf-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
  public sort: 'all' | 'newest' | 'oldest' | 'relate' = 'all';
  public openCmtForm: boolean = false;
  public addCmtLoading: boolean = false;
  public currentUser$!: Observable<CurrentUser | null>;
  public totalComment: number = 0;
  public end: boolean = false;
  public isLoading: boolean = false;
  public noComment: boolean = false;
  public commentList:
    | {
        comment: CommentItem;
        user: CurrentUser;
        reply: CommentItem[];
      }[]
    | null = null;

  private destroy$: Subject<null> = new Subject();
  private replyForCmtId: string | null = null;
  private limit$: BehaviorSubject<number> = new BehaviorSubject(10);

  @Input('comic-id') comicId!: number;

  @ViewChild('eFormReply') eFormReply!: ElementRef<HTMLDivElement>;
  @ViewChild('eCommentListContainer')
  eCommentListContainer!: ElementRef<HTMLDivElement>;

  constructor(
    private readonly fs: FirebaseService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(currentUserSelector);

    this.limit$
      .asObservable()
      .pipe(
        tap(() => (this.isLoading = true)),
        switchMap((limit) => this.getBatchComic(this.comicId, limit)),
        takeUntil(this.destroy$)
      )
      .subscribe((comments) => {
        if (!comments.length) this.noComment = true;
        this.commentList = comments;
        this.isLoading = false;
      });

    setTimeout(() => {
      this.fs
        .getTotalComment(this.comicId)
        .pipe(take(1))
        .subscribe((totalComment) => (this.totalComment = totalComment));
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public onScroll(): void {
    if (
      this.totalComment > 0 &&
      this.commentList?.length! >= this.totalComment
    ) {
      this.end = true;
      return;
    }
    this.limit$.next(this.limit$.value + 10);
  }

  private getBatchComic(
    comicId: number,
    limit: number
  ): Observable<
    {
      comment: CommentItem;
      user: CurrentUser;
      reply: CommentItem[];
    }[]
  > {
    return this.fs.getComments(comicId, limit).pipe(
      switchMap((comments) => {
        return from(comments).pipe(
          mergeMap((comment) =>
            zip([
              of(comment),
              this.fs.getCMTUserInfo(comment.uid),
              this.fs.getReplyCMTs(comment.commentId!),
            ])
          ),
          map(([comment, user, reply]) => ({ comment, user, reply })),
          reduce((acc, val) => {
            return [...acc, val];
          }, [] as any[])
        );
      })
    );
  }

  public handleAddComment(comment: CommentItem): void {
    this.addCmtLoading = true;
    this.fs.addComment({ ...comment, comicId: this.comicId }).then(() => {
      this.openCmtForm = false;
      this.addCmtLoading = false;
    });
  }

  public handleAppendFromReply(index: number, cmtId: string): void {
    this.replyForCmtId = cmtId;
    if (
      this.eCommentListContainer.nativeElement.contains(
        this.eFormReply.nativeElement
      )
    ) {
      this.eCommentListContainer.nativeElement.removeChild(
        this.eFormReply.nativeElement
      );
    }
    if (
      index + 1 >=
      this.eCommentListContainer.nativeElement.childNodes.length
    ) {
      this.eCommentListContainer.nativeElement.appendChild(
        this.eFormReply.nativeElement
      );
      return;
    }
    this.eCommentListContainer.nativeElement.insertBefore(
      this.eFormReply.nativeElement,
      this.eCommentListContainer.nativeElement.childNodes[index + 1]
    );
    this.openCmtForm = true;
  }

  public handleReply(comment: CommentItem): void {
    this.addCmtLoading = true;
    this.fs
      .addReply({ ...comment, comicId: this.comicId }, this.replyForCmtId!)
      .then(() => {
        this.openCmtForm = false;
        this.addCmtLoading = false;
        this.handleRefreshCmt();
      });
  }

  public handleRefreshCmt(): void {
    this.limit$.next(this.limit$.value);
  }

  public handleSortComments(): void {
    this.store.dispatch(
      addToatAction({
        message: {
          content:
            'Tính năng này chưa làm nhưng ad vẫn bỏ vô cho vui, có gì update sau, ae chờ ad nhé ',
          type: 'info',
        },
      })
    );
  }

  public trackById(
    _: any,
    comment: {
      comment: CommentItem;
      user: CurrentUser;
      reply: CommentItem[];
    }
  ): string | undefined {
    return comment.comment.commentId;
  }
}
