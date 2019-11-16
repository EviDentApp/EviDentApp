import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { RequisitionsService } from './requisitions.service';


@Injectable({
  providedIn: 'root'
})
export class SavedTextsService {

  private database: SQLiteObject;

  constructor(
    private plt: Platform, 
    private sqlite: SQLite,
    private req: RequisitionsService,
  ) { 

    alert('vou criar')

    this.plt.ready().then(() => {
      this.sqlite.create({ name: 'evident.db', location: 'default'})
        .then((db: SQLiteObject) => {
          this.database = db;
          db.executeSql('CREATE TABLE IF NOT EXISTS texts (id varchar(50), title text, img blob, abstract_intro text, abstract text)', [])
            .then(() => {
              db.executeSql('CREATE TABLE IF NOT EXISTS slides (text_id varchar(50), order_no int, img blob, description text)', [])
              .then(() => {
                alert('criou')
              })
              .catch(e => alert(e));
            })
            .catch(e => alert(e));
        }).catch(e => alert(e));
    });
  }

  async saveText(detail) {
    try {

      alert('vou salvar artigo')
      
      let data_img = await this.req.getImage(detail.url_image).toPromise();
      alert(data_img);
      let reader = new FileReader();
      let _this = this;
      reader.onload = async function() {
        try {
          alert(reader.result.toString());
          await _this.database.executeSql('INSERT INTO texts VALUES (?, ?, ?, ?, ?)', [
            detail._id,
            detail.title,
            reader.result.toString(),
            detail.abstract_intro,
            detail.abstract
          ]);
          
          alert('salvou artigo')
        }
        catch(e) {
          alert('Erro ao salvar:' + e);
        }
      };
      reader.readAsDataURL(data_img.blob());
    }
    catch(e) {
      alert('Erro ao baixar:' + e);
    }
  }

  async saveSlide(text_id, slide) {
    try {

      alert('vou salvar slide')
      
      let data_img = await this.req.getImage(slide.url_image).toPromise();
      alert(data_img);
      let reader = new FileReader();
      let _this = this;
      reader.onload = async function() {
        try {
          alert(reader.result.toString());
          await _this.database.executeSql('INSERT INTO slides VALUES (?, ?, ?, ?)', [
            text_id,
            slide.order_no,
            reader.result.toString(),
            slide.description
          ]);
          
          alert('salvou slide')
        }
        catch(e) {
          alert('Erro ao salvar:' + e);
        }
      };
      reader.readAsDataURL(data_img.blob());
    }
    catch(e) {
      alert('Erro ao baixar:' + e);
    }
  }

}
