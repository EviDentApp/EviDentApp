import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class SavedTextsService {

  private database: SQLiteObject;

  constructor(
    private plt: Platform, 
    private sqlite: SQLite,
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

  async saveText(detail, img) {
    let reader = new FileReader();
    let db = this.database;
    reader.onload = function() {
  
      alert('vou salvar artigo')
  
      db.executeSql('INSERT INTO texts VALUES (?, ?, ?, ?, ?)', [
        detail._id,
        detail.title,
        reader.result,
        detail.abstract_intro,
        detail.abstract
      ])
      .then(() => {
        alert('salvou artigo')
      })
      .catch(e => alert(e));
    }


    try {
      reader.readAsDataURL(img);
    }
    catch (e) {
      alert(e);
    }
  }

  async saveSlide(text_id, slide, slide_img) {
    let reader = new FileReader();
    let db = this.database;
    reader.onload = function() {
      
      alert('vou salvar slide')
      
      db.executeSql('INSERT INTO slides VALUES (?, ?, ?, ?)', [
        text_id,
        slide.order_no,
        reader.result,
        slide.description
      ])
      .then(() => {
        alert('salvou slide')
      })
      .catch(e => alert(e));
    }
    
    try {
      reader.readAsDataURL(slide_img);
    }
    catch (e) {
      alert(e);
    }
  }

}
