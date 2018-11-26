import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitionsService } from '../requisitions.service';
import { LoadingController } from '@ionic/angular';
import { UtilService } from '../util.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-text-by-themes',
  templateUrl: './text-by-themes.page.html',
  styleUrls: ['./text-by-themes.page.scss'],
})
export class TextByThemesPage implements OnInit {

  public name: string;
  public color: string;
  public id: string;
  public texts: any;
  public keyword: string;

  constructor(
    private utilFunctions: UtilService,
    private route: ActivatedRoute,
    private requisition: RequisitionsService,
    private router: Router,
    private loadCtrl: LoadingController,
    private ga: GoogleAnalytics
  ) {
    this.ga.startTrackerWithId('UA-128523572-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('List of Texts by theme');

      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
   }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.color = this.route.snapshot.paramMap.get('color');
    this.id = this.route.snapshot.paramMap.get('id');
    this.initialize(this.id, '');
  }

  async initialize(theme, keyword) {
    const loading = await this.loadCtrl.create({
      message: "Loading"
    });
    loading.present().then(() => {
      this.requisition.textGetList(theme, keyword).subscribe(
        data => {
          const response = (data as any);
          const returned_object = JSON.parse(response._body);
          this.texts = returned_object.texts;
        },
        error => {
          console.log(error);
          this.utilFunctions.presentAlert(error);
        }
      );
      loading.dismiss();
    }); 
  }

  filterList(keyword: any) {
    this.keyword = keyword.target.value;
    this.requisition.textGetList (this.id, this.keyword).subscribe(
      data => {
        const response = (data as any);
        const returned_object = JSON.parse(response._body);
        this.texts = returned_object.texts;
      },
      error => {
        console.log(error);
      }
    );
  }

  goToDetail(event, text) {
    this.router.navigate(['textDetail', { text_id: text['_id']['$oid'], text_title: text.title }]);
  }

  doRefresh(event){
    this.initialize(this.id, '');
    setTimeout(() => {
      console.log('Refresh done.');
      event.target.complete();
    }, 750);
  }
}