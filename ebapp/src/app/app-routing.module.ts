import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'textByThemes', loadChildren: './text-by-themes/text-by-themes.module#TextByThemesPageModule' },
  { path: 'textDetail', loadChildren: './text-detail/text-detail.module#TextDetailPageModule' },
  { path: 'methodologyDetail', loadChildren: './methodology-detail/methodology-detail.module#MethodologyDetailPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
