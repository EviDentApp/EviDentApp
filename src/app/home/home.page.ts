import { Component } from '@angular/core';
import { RequisitionsService } from '../requisitions.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public themes: string[];
  public keyword: string;
  public texts: string[];
  public loading: any;

  constructor(
    private requisition: RequisitionsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.initialize();
  }


  async initialize() {
    const loading = await this.loadingCtrl.create({
      message: "Loading"
    });
    loading.present().then(() => {
      this.requisition.themesGetList().subscribe(
        data => {
          const response = (data as any);
          const returned_object = JSON.parse(response._body);
          this.themes = returned_object.themes;
          console.log(this.themes)
        },
        error => {
          console.log(error);
          this.presentAlert(error);
        }
      );
      loading.dismiss();
    });
  }

  filterList(keyword: any) {
    this.keyword = keyword.target.value;
    console.log(this.keyword)
    this.requisition.textGetList("", this.keyword).subscribe(
      data => {
        const response = (data as any);
        const returned_object = JSON.parse(response._body);
        this.texts = returned_object.texts;
        console.log(this.texts)
      },
      error => {
        console.log(error);

      }
    );
  }

  themeTapped(event, theme) {
    this.router.navigate(['textByThemes', { id: theme._id, theme: theme.name }])
  }
  goToDetail(event, text) {
    this.router.navigate(['textDetail', { text_id: text._id, text_title: text.title }])
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create();
    return await this.loading.present();
  }
  
  async dismissLoading() {
    return await this.loading.dismiss();
  }
  async presentAlert(messageText) {
    const alert = await this.alertCtrl.create({
      header: "Atenção",
      message: messageText,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
