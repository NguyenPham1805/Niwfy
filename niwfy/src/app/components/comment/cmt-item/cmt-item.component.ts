import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { take } from 'rxjs';
import { currentUserSelector } from 'src/app/core/store/selectors/user.selector';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { CommentItem } from 'src/app/shared/types/message.interface';
import { CurrentUser } from 'src/app/shared/types/user.interface';

@Component({
  selector: 'nf-cmt-item',
  templateUrl: './cmt-item.component.html',
  styleUrls: ['./cmt-item.component.scss'],
})
export class CmtItemComponent implements OnInit {
  public currentUser: CurrentUser | null = null;
  @Input() user?: CurrentUser;
  @Input() comment!: CommentItem;
  @Input('reply-cmt') isReplyCmt!: boolean;
  @Input('comment-id') commentId?: string;

  @Output() reply = new EventEmitter();
  @Output() refresh = new EventEmitter();

  constructor(
    private readonly fs: FirebaseService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(currentUserSelector)
      .pipe(take(1))
      .subscribe((user) => (this.currentUser = user));

    setTimeout(() => {
      if (!this.user) {
        this.fs
          .getCMTUserInfo(this.comment.uid)
          .pipe(take(1))
          .subscribe((user) => {
            this.user = user;
          });
      }
    }, 0);
  }

  public handleAddReaction(type: number): void {
    if (!this.currentUser) return;
    const value =
      Object.entries(this.comment?.reaction || {}).find(
        (react) => react[0] === this.currentUser?.uid
      )?.[1] === type
        ? 0
        : type;

    this.fs.addReaction(
      this.commentId!,
      value,
      this.currentUser!.uid,
      this.isReplyCmt,
      this.comment?.commentId
    );
    this.refresh.emit();
  }
}
