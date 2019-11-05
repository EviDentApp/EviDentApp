import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { LoginPage } from './login.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { UtilService } from '../util.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  let mockStorage, mockUtilService, mockFb, mockGoogle
  let dom, email, password, loginButton

  beforeEach(async(() => {
    mockStorage = jasmine.createSpyObj('Storage', ['set']);
    mockUtilService = jasmine.createSpyObj('UtilService', ['presentAlert']);
    mockFb = jasmine.createSpyObj('Facebook', ['login'])
    mockGoogle = jasmine.createSpyObj('GooglePlus', ['login'])
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Storage, useValue: mockStorage},
        { provide: UtilService, useValue: mockUtilService},
        { provide: Facebook, useValue: mockFb},
        { provide: GooglePlus, useValue: mockGoogle},
      ],
      imports: [ RouterTestingModule.withRoutes([]), HttpModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    email = dom.querySelector('#email');
    password = dom.querySelector('#email_password');
    loginButton = dom.querySelector('form ion-button')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get UI components', () => {
    expect(email.getAttribute('name')).toBe('email')
    expect(password.getAttribute('name')).toBe('email_password')
    expect(loginButton.textContent).toBe('Login')
    expect(loginButton instanceof HTMLElement).toBeTruthy();
  });

  it('should accept valid user data', async(() => {

    console.log(loginButton);

    email.value = 'oi';
    password.value = 'tudo bem';
    loginButton.click();

    // TODO não está chamando o método LOGIN

  }));

});
