import { Component, OnInit } from '@angular/core';
import { SavedTextsService } from '../saved-texts.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saved-text',
  templateUrl: './saved-text.page.html',
  styleUrls: ['./saved-text.page.scss'],
})
export class SavedTextPage implements OnInit {

  public detail: any;

  constructor(
    private savedTexts: SavedTextsService,
    private loadCtrl: LoadingController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    alert('cheguei!')

    let text_id = this.route.snapshot.paramMap.get('text_id');
    this.initialize(text_id);
  }

  async initialize(text_id) {
    try {
      alert('carregando ' + text_id)
  
      const loading = await this.loadCtrl.create({
        message: "Carregando"
      });
      await loading.present();
      this.detail = await this.savedTexts.detail(text_id);
  
      alert('carregado texto ' + this.detail.title)
  
  
      this.detail.slideshow = await this.savedTexts.slides(text_id);
  
      alert('carregado slide ' + this.detail.slideshow.description)
  
      loading.dismiss();
    }
    catch(e) {
      alert('Erro ao carregar: ' + JSON.stringify(e))
    }
  }

}