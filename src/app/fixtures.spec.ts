import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { UtilService } from './util.service';
import { RequisitionsService } from './requisitions.service';


export let fixture: ComponentFixture<any>;
export let component
export let reqService: RequisitionsService;
export let mockStorage, mockUtilService, mockFb, mockGoogle, mockRouter, mockGoogleAnalytics,
           mockActivatedRoute, mockLoadingController

let activatedRoute

export function createTestBed(pageClass, defaults: any = {}) {
  createMocks(defaults);
  TestBed.configureTestingModule({
    declarations: [ pageClass ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
      { provide: Storage, useValue: mockStorage},
      { provide: UtilService, useValue: mockUtilService},
      { provide: Facebook, useValue: mockFb},
      { provide: GooglePlus, useValue: mockGoogle}, 
      { provide: GoogleAnalytics, useValue: mockGoogleAnalytics },
      { provide: Router, useValue: mockRouter },
      { provide: ActivatedRoute, useValue: activatedRoute },
      LoadingController,
    ],
    imports: [ 
      FormsModule,
      CommonModule,
      BrowserModule,
      IonicModule.forRoot(),
      HttpModule,
      RouterTestingModule.withRoutes([]),
    ],
  }).compileComponents();
  reqService = TestBed.get(RequisitionsService);
  reqService.endpoint = "http://localhost:5000";
  fixture = TestBed.createComponent(pageClass);
  component = fixture.componentInstance;
  fixture.detectChanges();
}

export function waitForCondition(conditionFunction) {
  return new Promise((resolve, reject) => {

    console.log('waiting...')

    let waitFunction = () => {
      if (conditionFunction()) {
        console.log('condition satisfied!!')
        resolve();
      }
      else {
        console.log('not yet...')
        setTimeout(waitFunction, 300);
      }
    };
    setTimeout(waitFunction, 300);
  });
}

function createMocks(defaults) {
  mockStorage = defaults.mockStorage ? defaults.mockStorage :
      jasmine.createSpyObj('Storage', ['set']);

  mockUtilService = defaults.mockUtilService ? defaults.mockUtilService :
      jasmine.createSpyObj('UtilService', ['presentAlert']);

  mockFb = defaults.mockFb ? defaults.mockFb :
      jasmine.createSpyObj('Facebook', ['login'])

  mockGoogle = defaults.mockGoogle ? defaults.mockGoogle :
      jasmine.createSpyObj('GooglePlus', ['login'])

  mockGoogleAnalytics = defaults.mockGoogleAnalytics ? defaults.mockGoogleAnalytics :
      jasmine.createSpyObj('GoogleAnalytics', ['startTrackerWithId',
                       'setUserId',  'addCustomDimension', 'trackMetric', 'trackEvent'])

  mockRouter = defaults.mockRouter ? defaults.mockRouter :
      jasmine.createSpyObj('Router', ['navigateByUrl']);

  mockActivatedRoute = defaults.mockActivatedRoute ? defaults.mockActivatedRoute :
      jasmine.createSpyObj('ActivatedRoute', ['get']);

  activatedRoute = {
    snapshot: {
      paramMap: mockActivatedRoute
    }
  };
}

export function sendInput(inputElement: HTMLInputElement,text: string) {
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
}

