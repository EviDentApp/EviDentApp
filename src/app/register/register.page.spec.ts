import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { UtilService } from '../util.service';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  let mockStorage, mockUtilService

  beforeEach(async(() => {
    mockStorage = jasmine.createSpyObj('Storage', ['get', 'set', 'remove'])
    mockStorage.get.and.returnValue(Promise.resolve(null))
    mockUtilService = jasmine.createSpyObj('UtilService', ['presentAlert']);
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UtilService, useValue: mockUtilService},
        {provide: Storage, useValue: mockStorage},
      ],
      imports: [RouterTestingModule.withRoutes([]), HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
