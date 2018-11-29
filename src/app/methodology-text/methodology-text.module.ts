import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MethodologyTextPage } from './methodology-text.page';

const routes: Routes = [
  {
    path: '',
    component: MethodologyTextPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MethodologyTextPage]
})
export class MethodologyTextPageModule {}
