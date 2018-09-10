import { Component } from '@angular/core';
import { RequisitionsService } from '../requisitions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  list: string[];
  constructor(private requisition: RequisitionsService) {
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
        this.list = objeto_retorno.temas;

      },
      error => {
        console.log("O meu nome é erro");
      }
    );
  }


}
