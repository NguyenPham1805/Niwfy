import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterComponent } from './chapter/chapter.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'info/:slug',
        component: InfoComponent,
      },
      {
        path: 'chapter/:id/:slug',
        component: ChapterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicRoutingModule {}
