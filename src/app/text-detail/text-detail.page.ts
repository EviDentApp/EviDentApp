import { Component, OnInit, APP_INITIALIZER, ElementRef, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitionsService } from '../requisitions.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UtilService } from '../util.service';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-text-detail',
  templateUrl: './text-detail.page.html',
  styleUrls: ['./text-detail.page.scss'],
})
export class TextDetailPage implements OnInit {
  public detail: any;
  public text_id: string;
  public text_title: string;
  public thermometer: string;
  public podium: string;
  public image_link = "/assets/img/";

  constructor(
    private utilFunctions: UtilService,
    private route: ActivatedRoute,
    private requisition: RequisitionsService,
    private router: Router,
    private loadCtrl: LoadingController,
    private analytics: AnalyticsService,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.text_id = this.route.snapshot.paramMap.get('text_id');
    this.text_title = this.route.snapshot.paramMap.get('text_title');
    this.initialize(this.text_id);
  }

  async initialize(text_id) {
    const loading = await this.loadCtrl.create({
      message: "Loading"
    });
    loading.present().then(() => {
      this.requisition.textGetDetail(text_id).subscribe(
        data => {
          const response = (data as any);
          const returned_object = JSON.parse(response._body);
          this.detail = returned_object.text;
          //this.mapThermometer(...........)
          this.thermometer = this.image_link + "termometro1.jpg";
          this.mapEvidenceLevel(this.detail.study_relevance)
          this.requisition.slideGetList(text_id).subscribe(
            data => {
              const response = (data as any);
              this.detail.slideshow = JSON.parse(response._body).slides;

              console.info(this.detail.slideshow);
            },
            error => {
              console.log(error);
              this.utilFunctions.presentAlert(error);
            }
          );
    
        },
        error => {
          console.log(error);
          this.utilFunctions.presentAlert(error);
        }
      );
      loading.dismiss();
    });
  }

  async goToMethodology(event, methodologies_id) {
    await this.storage.set('text_title', this.text_title)
    this.router.navigate(['methodologyDetail', { metho_id: methodologies_id }]);
  }

  describeThermometer() {
    this.utilFunctions.presentAlert('qual termometro vai aqui?')
  }

  describePodium() {
    switch (this.detail.study_relevance) {
      case '1': {
        this.utilFunctions.presentAlert('Melhor evidência disponível e possível');
        break;
      }
      case '2': {
        this.utilFunctions.presentAlert('Melhor evidência disponível mas não possível');
        break;
      }
      case '3': {
        this.utilFunctions.presentAlert('Existem evidências de maior nível disponíveis');
        break;
      }
    }
  }

  async addEvent(event, title) {
    try {
      await this.analytics.trackPaperVisualization(title);
    }
    catch (e) {
      alert(e);
    }
  }

  // TODO vai mostar um ou mais termômetros?
  mapThermometer(temperature) {
    this.thermometer = this.image_link + "termometro" + temperature + ".jpg";
  }
  
  mapEvidenceLevel(evidence) {
    this.podium = this.image_link + "evidencia" + evidence + ".jpg";
  }

}
