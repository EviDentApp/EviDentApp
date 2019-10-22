import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, LoadChildren, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { RequisitionsService } from '../requisitions.service';
import { LoadingController } from '@ionic/angular';
import { UtilService } from '../util.service';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-methodology-detail',
  templateUrl: './methodology-detail.page.html',
  styleUrls: ['./methodology-detail.page.scss'],
})
export class MethodologyDetailPage implements OnInit {

  public metho_id;
  public methodologies: any;

  private text_title;

  constructor(
    private utilFunctions: UtilService,
    private route: ActivatedRoute,
    private requisition: RequisitionsService,
    private loadCtrl: LoadingController,
    private router: Router,
    private storage: Storage,
    private analytics: AnalyticsService,
    ) {
  }

  ngOnInit() {
    this.metho_id = this.route.snapshot.paramMap.get('metho_id');
    this.initialize(this.metho_id);
    this.storage.get('text_title').then(title => {
      this.text_title = title;
      this.storage.remove('text_title');
    });
  }

  async initialize(metho_id) {
    var methoArray = metho_id.split(",");
    const loading = await this.loadCtrl.create({
      message: "Loading"
    });
    loading.present().then(() => {
      this.requisition.methodologiesGetArray(methoArray).subscribe(
        data => {
          const response = (data as any);
          const returned_object = JSON.parse(response._body);
          this.methodologies = returned_object.methodologies
        },
        error => {
          console.log(error);
          this.utilFunctions.presentAlert(error);
        }
      );
      loading.dismiss();
    });

  }
  goToMethodologyText(event, methoName, methoText, methoThermometer){
    this.analytics.trackMetodologyVisualization(methoName, this.text_title);
    this.router.navigate(['methodologyText', { methoName: methoName, methoText: methoText, methoThermometer: methoThermometer}]);
  }
}
