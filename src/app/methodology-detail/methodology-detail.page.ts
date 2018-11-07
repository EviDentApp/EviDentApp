import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, LoadChildren } from '@angular/router';
import { RequisitionsService } from '../requisitions.service';
import { LoadingController } from '@ionic/angular';
import { UtilService } from '../util.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-methodology-detail',
  templateUrl: './methodology-detail.page.html',
  styleUrls: ['./methodology-detail.page.scss'],
})
export class MethodologyDetailPage implements OnInit {

  public metho_id;
  public methodology: any;

  constructor(
    private utilFunctions: UtilService,
    private route: ActivatedRoute,
    private requisition: RequisitionsService,
    private loadCtrl: LoadingController,
    private ga: GoogleAnalytics
  ) {
    this.ga.startTrackerWithId('UA-128523572-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('Methodology Detail');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
   }

  ngOnInit() {
    this.metho_id = this.route.snapshot.paramMap.get('metho_id');
    this.initialize(this.metho_id);
  }

  async initialize(metho_id) {
    console.log(metho_id)
    const loading = await this.loadCtrl.create({
      message: "Loading"
    });
    loading.present().then(() => {
      this.requisition.methodologyGetDetail(metho_id).subscribe(
        data => {
          const response = (data as any);
          const returned_object = JSON.parse(response._body);
          this.methodology = returned_object.methodologies;
          console.log(returned_object)
        },
        error => {
          console.log(error);
          this.utilFunctions.presentAlert(error);
        }
      );
      loading.dismiss();
    });
  }
}
