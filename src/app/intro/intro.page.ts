import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { RequisitionsService } from '../requisitions.service';
import { UtilService } from '../util.service';

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
              private requisition: RequisitionsService,
              private utilFunctions: UtilService,
              ) {}
              

  ngOnInit() {
  }

  async finish() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/login');
  
  }

}


