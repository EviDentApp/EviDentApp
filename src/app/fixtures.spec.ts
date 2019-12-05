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
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { UtilService } from './util.service';
import { RequisitionsService } from './requisitions.service';
import { Platform } from '@ionic/angular';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { SavedTextsService } from './saved-texts.service';


export let fixture: ComponentFixture<any>;
export let component
export let reqService: RequisitionsService;
export let mockStorage, mockUtilService, mockFb, mockGoogle, mockRouter, mockGoogleAnalytics,
           mockActivatedRoute, mockLoadingController, mockSQLite, mockPlt, mockSavedTexts,
           mockAppComponent

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
      { provide: SQLite, useValue: mockSQLite },
      { provide: Platform, useValue: mockPlt },
      { provide: SavedTextsService, useValue: mockSavedTexts },
      { provide: AppComponent, useValue: mockAppComponent },
      LoadingController,
    ],
    imports: [ 
      FormsModule,
      CommonModule,
      BrowserModule,
      IonicModule.forRoot(),
      HttpModule,
      RouterTestingModule.withRoutes([]),
      QuillModule.forRoot(),
      SwiperModule,
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
    let waitFunction = () => {
      if (conditionFunction()) {
        resolve();
      }
      else {
        setTimeout(waitFunction, 300);
      }
    };
    setTimeout(waitFunction, 300);
  });
}

function createMocks(defaults) {
  mockStorage = defaults.mockStorage ? defaults.mockStorage :
      jasmine.createSpyObj('Storage', ['get', 'set']);

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

  mockSQLite = defaults.mockSQLite ? defaults.mockSQLite :
      jasmine.createSpyObj('SQLite', ['create'])
  
  mockPlt = defaults.mockPlt ? defaults.mockPlt :
      jasmine.createSpyObj('Platform', ['ready'])

  mockSavedTexts = defaults.mockSavedTexts ? defaults.mockSavedTexts :
      jasmine.createSpyObj('SavedTextsService', ['deleteText', 'deleteSlides', 'saveText', 
                           'saveSlide', 'all', 'detail', 'slides']);
  
  mockAppComponent = defaults.mockAppComponent ? defaults.mockAppComponent :
      jasmine.createSpyObj('AppComponent', ['backToPrevious']);
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

