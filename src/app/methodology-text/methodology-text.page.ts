import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-methodology-text',
  templateUrl: './methodology-text.page.html',
  styleUrls: ['./methodology-text.page.scss'],
})
export class MethodologyTextPage implements OnInit {
  public methodologyName: String;
  public methodologyText: String;
  public thermometer: String;
  public thermometer_color: String;
  
  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.methodologyName = (this.route.snapshot.paramMap.get('methoName'));
    this.methodologyText = (this.route.snapshot.paramMap.get('methoText'));
    this.thermometer = (this.route.snapshot.paramMap.get('methoThermometer'));
    this.mapThermometer(this.thermometer);
  }

  mapThermometer(value) {
    switch (value) {
      case '1': {
        this.thermometer = 'O grau de relevância é muito baixo';
        this.thermometer_color = '#cedaed';
        break;
      }
      case '2': {
        this.thermometer = 'O grau de relevância é baixo';
        this.thermometer_color = '#cee5ed';
        break;
      }
      case '3': {
        this.thermometer = 'O grau de relevância é médio';
        this.thermometer_color = '#ffffc6';
        break;
      }
      case '4': {
        this.thermometer = 'O grau de relevância é alto';
        this.thermometer_color = '#ffdcc6';
        break;
      }
      case '5': {
        this.thermometer = 'O grau de relevância é muito alto';
        this.thermometer_color = '#edcece';
        break;
      }
    }
  }
}
