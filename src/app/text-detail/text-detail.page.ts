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
  public relevance: string;
  public relevance_color: string;

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
        
          this.mapRelevance(this.detail.study_relevance)
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

  async addEvent(event, title) {
    try {
      await this.analytics.trackPaperVisualization(title);
    }
    catch (e) {
      alert(e);
    }
  }

  mapRelevance(id) {
    console.log("entrei")
    console.log(typeof id)
    console.log(id)
    switch (id) {
      case '1': {
        this.relevance = 'Melhor evidência disponível e possível';
        this.relevance_color = '#D1EDCE';
        break;
      }
      case '2': {
        this.relevance = 'Melhor evidência disponível mas não possível';
        this.relevance_color = '#edecce';
        break;
      }
      case '3': {
        this.relevance = 'Existem evidências de maior nível disponíveis';
        this.relevance_color = '#edcece';
        break;
      }
    }
  }
}
