import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { RequisitionsService } from '../requisitions.service';
import { UtilService } from '../util.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private facebook_id;
  private google_id;
  private name;
  private email;
  private email_password;
  private birth_year;
  private gender;
  private grade_year;
  private grade_state;

  private show_password = true;
  private erro = false;

  private states = [
    { id: 'AC', name: 'Acre' },
    { id: 'AL', name: 'Alagoas' },
    { id: 'AP', name: 'Amapá' },
    { id: 'AM', name: 'Amazonas' },
    { id: 'BA', name: 'Bahia' },
    { id: 'CE', name: 'Ceará' },
    { id: 'DF', name: 'Distrito Federal' },
    { id: 'ES', name: 'Espírito Santo' },
    { id: 'GO', name: 'Goías' },
    { id: 'MA', name: 'Maranhão' },
    { id: 'MT', name: 'Mato Grosso' },
    { id: 'MS', name: 'Mato Grosso do Sul' },
    { id: 'MG', name: 'Minas Gerais' },
    { id: 'PA', name: 'Pará' },
    { id: 'PB', name: 'Paraíba' },
    { id: 'PR', name: 'Paraná' },
    { id: 'PE', name: 'Pernambuco' },
    { id: 'PI', name: 'Piauí' },
    { id: 'RJ', name: 'Rio de Janeiro' },
    { id: 'RN', name: 'Rio Grande do Norte' },
    { id: 'RS', name: 'Rio Grande do Sul' },
    { id: 'RO', name: 'Rondônia' },
    { id: 'RR', name: 'Roraíma' },
    { id: 'SC', name: 'Santa Catarina' },
    { id: 'SP', name: 'São Paulo' },
    { id: 'SE', name: 'Sergipe' },
    { id: 'TO', name: 'Tocantins' },
  ];

  constructor(
    private storage: Storage,
    private requisition: RequisitionsService,
    private utilFunctions: UtilService,
    private router: Router
  ) { }

  ngOnInit() {
    this.storage.get('facebookData')
      .then(user => {
        this.loadFacebookData(user);
        this.storage.remove('facebookData');
      })
      .catch(err => {
        this.storage.get('googleData').then(user => {
          alert(user)
          this.loadGoogleData(user);
          this.storage.remove('googleData');
        });
      });
  }

  loadFacebookData(user) {
    user = JSON.parse(user);
    this.name = user.name;
    this.email = user.email;
    this.facebook_id = user.id;
    if(user.gender) {
      if(user.gender == 'male') {
        this.gender = 'M'
      }
      else if(user.gender == 'female') {
        this.gender = 'F'
      }
    }
    if(user.birthday) {
      var birth_date = user.birthday.split('/')
      if(birth_date.length == 1) {
        this.birth_year = birth_date[0]
      }
      else if (birth_date.length == 3) {
        this.birth_year = birth_date[2]
      }
    }
    this.show_password = false;
  }

  loadGoogleData(user) {
    user = JSON.parse(user);
    this.google_id = user.userId;
    this.name = user.displayName;
    this.email = user.email;
    this.show_password = false;
  }

  async register() {
    let obj = {
      "name": this.name,
      "facebook_id": this.facebook_id,
      "google_id": this.google_id,
      "email": this.email,
      "email_password": this.email_password,
      "birth_year": this.birth_year,
      "grade_year": this.grade_year,
      "gender": this.gender,
      "grade_state": this.grade_state,
    }

    this.requisition.dentistCreate(obj).subscribe(
      data => {
        const response = (data as any);
        const returned_object = JSON.parse(response._body);
        if (returned_object._id) {
          this.storage.set('user', JSON.stringify(returned_object)).then(() => {
            this.storage.set('isLoggedIn', true).then(() => {
              this.router.navigateByUrl('/');
            });
          });
        }
        else {
          this.erro = returned_object.erro
        }
      },
      error => {
        console.log(error);
        this.utilFunctions.presentAlert(error);
      }
    );
  }

}
