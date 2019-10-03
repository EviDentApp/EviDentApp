import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('facebookData').then(user => {
      alert('usuario -- ' + user);
    });
  }

}
