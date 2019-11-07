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
  public user: any;
  public detail: any;
  public text_id: string;
  public text_title: string;
  public thermometer: string;
  public podium: string;
  public image_link = "/assets/img/";
  public like :string = null;
  public likes :number = 0;
  public dislikes :number = 0;

  constructor(
    private utilFunctions: UtilService,
    private route: ActivatedRoute,
    private requisition: RequisitionsService,
    private router: Router,
    private loadCtrl: LoadingController,
    private analytics: AnalyticsService,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    this.user = JSON.parse(await this.storage.get('user'));
    this.text_id = this.route.snapshot.paramMap.get('text_id');
    this.text_title = this.route.snapshot.paramMap.get('text_title');
    this.initialize(this.text_id);
  }

  async initialize(text_id) {
    const loading = await this.loadCtrl.create({
      message: "Loading"
    });
    loading.present().then(() => {
      this.requisition.textGetDetail(text_id, this.user._id).subscribe(
        data => {
          const response = (data as any);
          const returned_object = JSON.parse(response._body);
          this.detail = returned_object.text;
          this.like = this.detail.likestatus;
          this.mapThermometer()
          this.mapEvidenceLevel()
          this.requisition.slideGetList(text_id).subscribe(
            data => {
              const response = (data as any);
              this.detail.slideshow = JSON.parse(response._body).slides;
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
    this.utilFunctions.presentAlert('Confiabilidade da metodologia (1 a 5): ' + 
                                    this.detail.thermometer)
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

  

  async toogleLike(state:string)
  {
    this.requisition.toogleLike(state, this.text_id, this.user._id).subscribe(
      data => {
        const response = (data as any);
        let res = JSON.parse(response._body);

        if (res.status) {
          this.like = res.status;
          this.detail.likes = res.likes;
          this.detail.dislikes = res.dislikes;
        }

        else
          alert(res.error);
      },
      error => {
        console.log(error);
        this.utilFunctions.presentAlert(error);
      }
    );

  }
  
  async addEvent(event, title) {
    try {
      await this.analytics.trackPaperVisualization(title);
    }
    catch (e) {
      alert(e);
    }
  }

  mapThermometer() {
    this.thermometer = this.image_link + "termometro" + this.detail.thermometer + ".jpg";
  }
  
  mapEvidenceLevel() {
    this.podium = this.image_link + "evidencia" + this.detail.study_relevance + ".jpg";
  }

}
