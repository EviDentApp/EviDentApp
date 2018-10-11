import { Component, OnInit, APP_INITIALIZER } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitionsService } from '../requisitions.service';
import { LoadingController } from '@ionic/angular';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-text-detail',
  templateUrl: './text-detail.page.html',
  styleUrls: ['./text-detail.page.scss'],
})
export class TextDetailPage implements OnInit {
  public detail: any;
  public text_id: string;
  public text_title: string;

  constructor(
    private utilFunctions: UtilService,
    private route: ActivatedRoute,
    private requisition: RequisitionsService,
    private router: Router,
    private loadCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.text_id = this.route.snapshot.paramMap.get('text_id');
    this.text_title = this.route.snapshot.paramMap.get('text_title');
    this.initialize(this.text_id)
  }

  async initialize(text_id) {
    console.log(text_id)
    const loading = await this.loadCtrl.create( {
      message: "Loading"
    });
    loading.present().then(() => {
      this.requisition.textGetDetail(text_id).subscribe(
        data => {
          const response = (data as any);
          const returned_object = JSON.parse(response._body);
          this.detail = returned_object.text;
          console.log(returned_object.text)
        },
        error => {
          console.log(error);
          this.utilFunctions.presentAlert(error);
        }
      );  
      loading.dismiss();  
    });
  }

  goToMethodology(event, methodology_id) {
    this.router.navigate(['methodologyDetail', { metho_id: methodology_id }]);
  }
}
