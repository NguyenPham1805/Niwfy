import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PipesModule } from 'src/app/shared/pipe/pipes.module';
import { CmtItemComponent } from './cmt-item/cmt-item.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentComponent } from './comment.component';
import { ReplyComponent } from './reply/reply.component';
@NgModule({
  declarations: [CommentComponent, CommentFormComponent, CmtItemComponent, ReplyComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    LazyLoadImageModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    PipesModule,
  ],
  exports: [CommentComponent, CommentFormComponent],
})
export class CommentModule {}
