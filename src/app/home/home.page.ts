import { Component } from '@angular/core';
import { RequisitionsService } from '../requisitions.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { UtilService } from '../util.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public themes: {};
  public keyword: string;
  public texts: string[];
  public loading: any;

  constructor(
    private utilFunctions: UtilService,
    private sanitizer: DomSanitizer,
    private requisition: RequisitionsService,
    private router: Router,
    private loadingCtrl: LoadingController) {
    }

  ngOnInit() {
    this.initialize();
  }


  async initialize() {
    const loading = await this.loadingCtrl.create({
      message: "Carregando"
    });
    loading.present().then(() => {
      this.requisition.themesGetList().subscribe(
        data => {
          const response = (data as any);
          const returned_object = JSON.parse(response._body);
          this.themes = returned_object.themes;
          console.log(data)
        },
        error => {  
          this.utilFunctions.presentAlert(error);
        }
      );
      loading.dismiss();
    });
  }

  filterList(keyword: any) {
    this.keyword = keyword.target.value;
    this.requisition.textGetList("", this.keyword).subscribe(
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

  themeTapped(event, theme) {
    this.router.navigate(['textByThemes', { id: theme['_id']['$oid'], name: theme.name }])
  }
  goToDetail(event, text) {
    this.router.navigate(['textDetail', { text_id: text['_id']['$oid'], text_title: text.title }])
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create();
    return await this.loading.present();
  }

  async dismissLoading() {
    return await this.loading.dismiss();
  }

  doRefresh(event) {
    this.initialize();
    setTimeout(() => {
      event.target.complete();
    }, 750);
  }

  savedTexts() {
    this.router.navigate(['my-saved-texts']);
  }

}
