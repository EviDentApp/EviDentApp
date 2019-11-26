import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { QuillModule } from 'ngx-quill';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { SavedTextPage } from './saved-text.page';

const routes: Routes = [
  {
    path: '',
    component: SavedTextPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuillModule.forRoot(),
    RouterModule.forChild(routes),
    SwiperModule,
  ],
  declarations: [SavedTextPage]
})
export class SavedTextPageModule {}
