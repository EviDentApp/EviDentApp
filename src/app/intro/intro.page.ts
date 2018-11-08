import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private storage: Storage,
              private router: Router) { }

  ngOnInit() {
  }
  async finish() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/');
  }

}
