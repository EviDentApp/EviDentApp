import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitionsService } from '../requisitions.service';
import { LoadingController } from '@ionic/angular';
import { UtilService } from '../util.service';

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
    private loadCtrl: LoadingController
  ) { }

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
          console.log(this.texts[0].url_image)
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
    this.requisition.textGetList (this.id, this.keyword).subscribe (
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
    console.log(text._id, text.title)
    this.router.navigate(['textDetail', { text_id: text._id, text_title: text.title }]);
  }
}