import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TextDetailPage } from './text-detail.page';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  {
    path: '',
    component: TextDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuillModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [TextDetailPage]
})
export class TextDetailPageModule {}
