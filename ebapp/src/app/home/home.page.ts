import { Component } from '@angular/core';
import { RequisitionsService } from '../requisitions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  themes: string[];
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
        console.log(response._body)
        this.themes = objeto_retorno.themes;

      },
      error => {
        console.log("O meu nome é erro");
      }
    );
  }
  filterList(keyword: any) {
    let val = keyword.target.value;
    console.log(val)
  }

  themeTapped(event, theme) {
    this.router.navigate(['textByThemes', { id: theme.id, theme: theme.name }])
  }


}
