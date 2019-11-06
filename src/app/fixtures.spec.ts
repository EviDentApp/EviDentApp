import { RouterTestingModule } from '@angular/router/testing';
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

import { UtilService } from './util.service';
import { RequisitionsService } from './requisitions.service';
import { Router } from '@angular/router';


export let fixture: ComponentFixture<any>;
export let component
export let reqService: RequisitionsService;
export let mockStorage, mockUtilService, mockFb, mockGoogle, mockRouter

export async function createTestBed(pageClass) {
    mockStorage = jasmine.createSpyObj('Storage', ['set']);
    mockUtilService = jasmine.createSpyObj('UtilService', ['presentAlert']);
    mockFb = jasmine.createSpyObj('Facebook', ['login'])
    mockGoogle = jasmine.createSpyObj('GooglePlus', ['login'])
    await TestBed.configureTestingModule({
      declarations: [ pageClass ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Storage, useValue: mockStorage},
        { provide: UtilService, useValue: mockUtilService},
        { provide: Facebook, useValue: mockFb},
        { provide: GooglePlus, useValue: mockGoogle},
      ],
      imports: [ 
        FormsModule,
        CommonModule,
        BrowserModule,
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]), 
        HttpModule,
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(pageClass);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    await fixture.whenStable();
    reqService = TestBed.get(RequisitionsService);
    reqService.endpoint = "http://localhost:5000";
    mockRouter = TestBed.get(Router)
}

export function sendInput(inputElement: HTMLInputElement,text: string) {
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
}

