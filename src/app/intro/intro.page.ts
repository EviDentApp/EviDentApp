import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  public gender: any;
  public age: any;
  isLoggedIn:boolean = false;
  users: any;

  constructor(private storage: Storage,
              private router: Router,
              private ga: GoogleAnalytics,
              private fb: Facebook) { 

                fb.getLoginStatus()
                .then(res => {
                  console.log(res.status);
                  if(res.status === "connect") {
                    this.isLoggedIn = true;
                  } else {
                    this.isLoggedIn = false;
                  }
                })
                .catch(e => console.log(e));
              }

  ngOnInit() {
  }

  login() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  logout() {
    this.fb.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
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
    */
    this.router.navigateByUrl('/');
  
  }

}


