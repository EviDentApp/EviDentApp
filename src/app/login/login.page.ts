import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook/ngx';
import { RequisitionsService } from '../requisitions.service';
import { UtilService } from '../util.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email;
  private email_password;

  constructor(
    private storage: Storage,
    private router: Router,
    private requisition: RequisitionsService,
    private utilFunctions: UtilService,
    private fb: Facebook,
    private gplus: GooglePlus,
  ) {}

  ngOnInit() {
  }


  login_facebook() {
    this.fb.login(['public_profile', 'user_birthday', 'user_gender', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.requisition.dentistGetByFacebook(res.authResponse.userID).subscribe(
            data => {
              const response = (data as any);
              const returned_object = JSON.parse(response._body);
              if(returned_object.error == undefined) {
                this.storage.set('user', JSON.stringify(returned_object)).then(() => {
                  this.storage.set('isLoggedIn', true).then(() => {
                    this.router.navigateByUrl('/');
                  });
                });
              }
              else {
                this.getFacebookDetail(res.authResponse.userID).then(user => {
                  this.storage.set('facebookData', JSON.stringify(user)).then(() => {
                    this.router.navigateByUrl('/register');
                  });
                }).catch(e => {
                  alert('erro no facebook ' + e);
                })
              }              
            },
            error => {
              this.utilFunctions.presentAlert(error);
            }
          );
        } else {
          this.utilFunctions.presentAlert("Não foi possível conectar com o Facebook");
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  async getFacebookDetail(userid) {
    let response = await this.fb.api("/"+userid+"/?fields=email,name,gender,birthday,education,address",
                                     ["public_profile"]);
    if (response.error)
      throw response.error;  
    else
      return response;
  }

  login_google() {
    this.gplus.login({}).then(gplusUser => {
      this.requisition.dentistGetByGoogle(gplusUser.userId).subscribe(
        data => {
          const response = (data as any);
          const returned_object = JSON.parse(response._body);
          if(returned_object.error == undefined) {
            this.storage.set('user', JSON.stringify(returned_object)).then(() => {
              this.storage.set('isLoggedIn', true).then(() => {
                this.router.navigateByUrl('/');
              });
            });
          }
          else {
            this.storage.set('googleData', JSON.stringify(gplusUser)).then(() => {
              this.router.navigateByUrl('/register');
            });
          }
        },
        error => {
          console.log(error);
          this.utilFunctions.presentAlert(error);
        }
      );
    })
    .catch(error => {
      console.log(error);
      this.utilFunctions.presentAlert(error);
    });
  }

  logout_facebook() {
    this.fb.logout()
      .catch(e => console.log('Error logout from Facebook', e));
  }

  login() {
    this.requisition.dentistLogin(this.email, this.email_password).subscribe(
      data => {
        const response = (data as any);
        const returned_object = JSON.parse(response._body);
        if(returned_object.error == undefined) {
          this.storage.set('user', JSON.stringify(returned_object)).then(() => {
            this.storage.set('isLoggedIn', true).then(() => {
              this.router.navigateByUrl('/');
            });
          });
        }
        else {
          this.utilFunctions.presentAlert(returned_object.error);
        }
      },
      error => {
        this.utilFunctions.presentAlert(error);
      }
    )
  }

  async register() {
    this.router.navigateByUrl('/register');
  }

}
