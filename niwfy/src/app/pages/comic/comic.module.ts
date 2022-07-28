import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { CommentModule } from 'src/app/components/comment/comment.module';
import { NotFoundModule } from 'src/app/components/not-found/not-found.module';
import { TitleModule } from 'src/app/components/title/title.module';
import { PipesModule } from 'src/app/shared/pipe/pipes.module';
import { ChapterComponent } from './chapter/chapter.component';
import { SidebarChapsComponent } from './chapter/sidebar-chaps/sidebar-chaps.component';
import { SlideComponent } from './chapter/slide/slide.component';
import { ComicRoutingModule } from './comic-routring.module';
import { InfoContainerComponent } from './info/info-container/info-container.component';
import { InfoComponent } from './info/info.component';
import { ListChapComponent } from './info/list-chap/list-chap.component';

@NgModule({
  declarations: [
    InfoComponent,
    ChapterComponent,
    SidebarChapsComponent,
    InfoContainerComponent,
    ListChapComponent,
    SlideComponent,
  ],
  imports: [
    CommonModule,
    ComicRoutingModule,
    RouterModule,
    TitleModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    CommentModule,
    PipesModule,
    NotFoundModule,
    LazyLoadImageModule,
  ],
  exports: [InfoComponent, ChapterComponent],
})
export class ComicModule {}
