import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router, NavigationEnd } from '@angular/router';
import { AnalyticsService } from './analytics.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
  ];

  public backPressed = false;
  
  private navLinksArray = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private analytics: AnalyticsService
  ) {
    this.initializeApp();
    this.router.events.subscribe(event =>{
      const url = this.router.url;
      if (event instanceof NavigationEnd && !this.backPressed) {
        const isCurrentUrlSaved = this.navLinksArray.find((item) => item === url);
        if (!isCurrentUrlSaved) this.navLinksArray.push(url);
      }
      this.backPressed = false
    });
    this.hardwareBackButton();
  }

  hardwareBackButton() {
    this.platform.backButton.subscribe(() => {
      if (this.navLinksArray.length > 1) {
        this.navLinksArray.pop();
        const index = this.navLinksArray.length - 1;
        const url = this.navLinksArray[index];
        this.backPressed = true
        this.router.navigateByUrl(url).catch(e => alert(e));
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.analytics.startTracking();
    });
  }
}
