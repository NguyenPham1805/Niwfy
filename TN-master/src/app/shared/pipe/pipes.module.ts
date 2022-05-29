import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChapSlugPipe } from './chap-slug.pipe';
import { ReactionPipe } from './reaction.pipe';
import { TimeLeftPipe } from './time-left.pipe';
import { GetTimePipe } from './get-time.pipe';
import { CheckReactionPipe } from './check-reaction.pipe';

@NgModule({
  declarations: [
    ChapSlugPipe,
    ReactionPipe,
    TimeLeftPipe,
    GetTimePipe,
    CheckReactionPipe,
  ],
  imports: [CommonModule],
  exports: [
    ChapSlugPipe,
    ReactionPipe,
    TimeLeftPipe,
    GetTimePipe,
    CheckReactionPipe,
  ],
})
export class PipesModule {}
