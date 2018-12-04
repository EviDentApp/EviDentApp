import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  public gender: any;
  public age: any;

  constructor(private storage: Storage,
              private router: Router,
              private ga: GoogleAnalytics) { }

  ngOnInit() {
  }

  async finish() {
    await this.storage.set('tutorialComplete', true);
    await this.storage.set('gender', this.gender);
    await this.storage.set('age', this.age);
    /*
    this.ga.startTrackerWithId('UA-128523572-1')
    .then(() => {
      this.ga.trackEvent("lead", "input", "age", this.age, false);
      this.ga.trackEvent("gender", "input", this.gender, 1, false);
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));

    this.router.navigateByUrl('/');
    */
  }

}


