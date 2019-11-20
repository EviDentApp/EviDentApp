import { Component, OnInit } from '@angular/core';
import { SavedTextsService } from '../saved-texts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-saved-texts',
  templateUrl: './my-saved-texts.page.html',
  styleUrls: ['./my-saved-texts.page.scss'],
})
export class MySavedTextsPage implements OnInit {

  private texts;

  constructor(
    private savedTexts: SavedTextsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.savedTexts.all().then(texts => {
      this.texts = texts;
    }).catch(e=>alert(JSON.stringify(e)))
  }

  goToDetail(text_id) {
    this.router.navigate(['saved-text', {text_id: text_id}])
               .catch(e => alert(JSON.stringify(e)));
  }

}
