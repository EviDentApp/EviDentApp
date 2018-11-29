import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, LoadChildren, Router } from '@angular/router';
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
  public methodologies: any;

  constructor(
    private utilFunctions: UtilService,
    private route: ActivatedRoute,
    private requisition: RequisitionsService,
    private loadCtrl: LoadingController,
    private router: Router,
    private ga: GoogleAnalytics
    ) {
    this.ga.startTrackerWithId('UA-130013750-1')
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
  goToMethodologyText(event, methoName, methoText){
    console.log(methoText)
    this.router.navigate(['methodologyText', { MeName: methoName, meText: methoText }]);
  
  }
}
