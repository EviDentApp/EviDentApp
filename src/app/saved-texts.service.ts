import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { RequisitionsService } from './requisitions.service';


@Injectable({
  providedIn: 'root'
})
export class SavedTextsService {

  public database: SQLiteObject;

  constructor(
    private plt: Platform, 
    private sqlite: SQLite,
    private req: RequisitionsService,
  ) { 
    this.plt.ready().then(() => {
      this.sqlite.create({ name: 'evident.db', location: 'default'})
        .then((db: SQLiteObject) => {
          this.database = db;
          db.executeSql('CREATE TABLE IF NOT EXISTS texts (id varchar(50), title text, img blob, abstract_intro text, abstract text)', [])
            .then(() => {
              db.executeSql('CREATE TABLE IF NOT EXISTS slides (text_id varchar(50), order_no int, img blob, description text)', [])
                .catch(e => alert(e));
            })
            .catch(e => alert(e));
        }).catch(e => alert(e));
    });
  }

  async deleteText(text_id) {
    try {
      await this.database.executeSql('DELETE FROM texts WHERE id = ?', [text_id]);
    }
    catch(e) {
      alert('Erro ao deletar texto:' + JSON.stringify(e));
    }
  }

  async deleteSlides(text_id) {
    try {
      await this.database.executeSql('DELETE FROM slides WHERE text_id = ?', [text_id]);
    }
    catch(e) {
      alert('Erro ao deletar slides:' + JSON.stringify(e));
    }
  }

  async saveText(text_id, detail) {
    try {
      let data_img = await this.req.getImage(detail.url_image).toPromise();
      let reader = new FileReader();
      let _this = this;
      reader.onload = async function() {
        try {
          await _this.database.executeSql('INSERT INTO texts VALUES (?, ?, ?, ?, ?)', [
            text_id,
            detail.title,
            reader.result.toString(),
            detail.abstract_intro,
            detail.abstract
          ]);
        }
        catch(e) {
          alert('Erro ao salvar texto:' + JSON.stringify(e));
        }
      };
      reader.readAsDataURL(data_img.blob());
    }
    catch(e) {
      alert('Erro ao baixar:' + JSON.stringify(e));
    }
  }

  async saveSlide(text_id, slide) {
    try {
      let data_img = await this.req.getImage(slide.url_image).toPromise();
      let reader = new FileReader();
      let _this = this;
      reader.onload = async function() {
        try {
          await _this.database.executeSql('INSERT INTO slides VALUES (?, ?, ?, ?)', [
            text_id,
            slide.order_no,
            reader.result.toString(),
            slide.description
          ]);
        }
        catch(e) {
          alert('Erro ao salvar slide:' + JSON.stringify(e));
        }
      };
      reader.readAsDataURL(data_img.blob());
    }
    catch(e) {
      alert('Erro ao baixar:' + JSON.stringify(e));
    }
  }

  all() {
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.database.executeSql('SELECT id, title, img FROM texts ORDER BY title',[])
        .then(data => {
          let texts = [];
          for (let i = 0; i < data.rows.length; i++) {
            texts.push(data.rows.item(i));
          }
          resolve(texts);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  detail(text_id) {
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.database.executeSql('SELECT * FROM texts where id = ?',[text_id])
        .then(data => {
          resolve(data.rows.item(0));
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  slides(text_id) {
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.database.executeSql(
          'SELECT * FROM slides WHERE text_id = ? ORDER BY order_no', 
          [text_id]
      ).then(data => {
          let slides = [];
          for (let i = 0; i < data.rows.length; i++) {
            slides.push(data.rows.item(i));
          }
          resolve(slides);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

}
