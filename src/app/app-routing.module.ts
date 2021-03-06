import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EbappGuard } from './guards/ebapp.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [EbappGuard]
  },
  { path: 'textByThemes', loadChildren: './text-by-themes/text-by-themes.module#TextByThemesPageModule' },
  { path: 'textDetail', loadChildren: './text-detail/text-detail.module#TextDetailPageModule' },
  { path: 'methodologyDetail', loadChildren: './methodology-detail/methodology-detail.module#MethodologyDetailPageModule' },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'methodologyText', loadChildren: './methodology-text/methodology-text.module#MethodologyTextPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'my-saved-texts', loadChildren: './my-saved-texts/my-saved-texts.module#MySavedTextsPageModule' },
  { path: 'saved-text', loadChildren: './saved-text/saved-text.module#SavedTextPageModule' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
