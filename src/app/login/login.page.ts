import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook/ngx';
import { RequisitionsService } from '../requisitions.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private storage: Storage,
              private router: Router,
              private requisition: RequisitionsService,
              private utilFunctions: UtilService,
              private fb: Facebook) {}

  ngOnInit() {
  }


  login_facebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.requisition.dentistGetByFacebook(res.authResponse.userID).subscribe(
            data => {
              const response = (data as any);
              const returned_object = JSON.parse(response._body);
              if(returned_object.error == undefined) {
                this.storage.set('user', JSON.stringify(returned_object));
                this.storage.set('isLoggedIn', true);
                this.router.navigateByUrl('/home');
              }
              else {
                this.getFacebookDetail(res.authResponse.userID).then(user => {
                  this.router.navigate(['/register', user]);
                }).catch(e => {
                  alert('erro', e);
                })
              }              
            },
            error => {
              console.log(error);
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
    if (!response.error)
      return response.data;
    else
      throw response.error;
  }

  logout_facebook() {
    this.fb.logout()
      .catch(e => console.log('Error logout from Facebook', e));
  }

  login(form) {


  }

  async register() {
    this.router.navigateByUrl('/register');
  
  }

}
