import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { HomeModule } from './pages/home/home.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserGuard } from './shared/guard/user.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'comic',
    loadChildren: () =>
      import('./pages/comic/comic.module').then((m) => m.ComicModule),
  },
  {
    path: 'history',
    canLoad: [UserGuard],
    loadChildren: () =>
      import('./pages/history/history.module').then((m) => m.HistoryModule),
  },
  {
    path: 'category/:category',
    loadChildren: () =>
      import('./pages/category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'finish',
    loadChildren: () =>
      import('./pages/finish/finish.module').then((m) => m.FinishModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
