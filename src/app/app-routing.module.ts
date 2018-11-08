import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EbappGuard } from './guards/ebapp.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [EbappGuard]
  },
  
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'textByThemes', loadChildren: './text-by-themes/text-by-themes.module#TextByThemesPageModule' },
  { path: 'textDetail', loadChildren: './text-detail/text-detail.module#TextDetailPageModule' },
  { path: 'methodologyDetail', loadChildren: './methodology-detail/methodology-detail.module#MethodologyDetailPageModule' },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
