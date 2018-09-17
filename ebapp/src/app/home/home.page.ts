import { Component } from '@angular/core';
import { RequisitionsService } from '../requisitions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public themes: string[];
  public keyword: string;
  public texts: string[];

  constructor(
    private requisition: RequisitionsService,
    private router: Router) {
  }

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.requisition.themesGetList().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.themes = objeto_retorno.themes;

      },
      error => {
        console.log(error);
      }
    );
  }
  filterList(keyword: any) {
    this.keyword = keyword.target.value;
    this.requisition.textGetList ('', this.keyword).subscribe (
      data => {
        const response = (data as any);
        const returned_object = JSON.parse(response._body);
        this.texts = returned_object.texts;
        
      },
      error => {
        console.log(error);
      }
    );
  }

  themeTapped(event, theme) {
    this.router.navigate(['textByThemes', { id: theme.id, theme: theme.name }])
  }
  goToDetail(event, text) {
    this.router.navigate(['textDetail', { text_id: text.id, text_title: text.title }])
  }
}
