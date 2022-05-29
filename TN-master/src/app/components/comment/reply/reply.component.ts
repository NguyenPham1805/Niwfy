import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentItem } from 'src/app/shared/types/message.interface';

@Component({
  selector: 'nf-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent {
  public isOpenReply: boolean = false;

  @Input() reply!: CommentItem[];
  @Input('for-id') forId!: string;

  @Output() refresh = new EventEmitter();
  @Output('reply') onReply = new EventEmitter();

  public handleReply(): void {
    this.onReply.emit();
  }

  public trackById(_: any, comment: CommentItem): string | undefined {
    return comment.commentId;
  }
}
