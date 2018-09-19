import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TextByThemesPage } from './text-by-themes.page';

const routes: Routes = [
  {
    path: '',
    component: TextByThemesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TextByThemesPage]
})
export class TextByThemesPageModule {}
