import { Component, OnInit } from '@angular/core';
import { SavedTextsService } from '../saved-texts.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';


@Component({
  selector: 'app-saved-text',
  templateUrl: './saved-text.page.html',
  styleUrls: ['./saved-text.page.scss'],
})
export class SavedTextPage implements OnInit {

  public text_id;
  public detail: any;
  public slideshow: any = [];

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    scrollbar: false,
    navigation: false,
    pagination: true
  };

  constructor(
    private savedTexts: SavedTextsService,
    private loadCtrl: LoadingController,
    private route: ActivatedRoute,
    private app: AppComponent,
  ) { }

  ngOnInit() {
    this.text_id = this.route.snapshot.paramMap.get('text_id');
    this.initialize(this.text_id);
  }

  async initialize(text_id) {
    try {
      const loading = await this.loadCtrl.create({
        message: "Carregando"
      });
      await loading.present();
      this.detail = await this.savedTexts.detail(text_id);
      this.slideshow = await this.savedTexts.slides(text_id);
      loading.dismiss();
    }
    catch(e) {
      alert('Erro ao carregar: ' + JSON.stringify(e))
    }
  }

  async delete() {
    await this.savedTexts.deleteText(this.text_id);
    await this.savedTexts.deleteSlides(this.text_id);
    this.app.backToPrevious();
  }

}