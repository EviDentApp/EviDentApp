import { LoginPage } from './login.page';

import { createTestBed, component, sendInput, fixture, mockStorage, mockRouter } from '../fixtures.spec';
import { async } from '@angular/core/testing';

describe('LoginPage', () => {
  let email, password, loginButton

  beforeEach(async () => {
    await createTestBed(LoginPage);
    let dom = fixture.nativeElement;
    email = dom.querySelector('#email');
    password = dom.querySelector('#email_password');
    loginButton = dom.querySelector('form ion-button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get UI components', () => {
    expect(email.getAttribute('name')).toBe('email')
    expect(password.getAttribute('name')).toBe('email_password')
    expect(loginButton.textContent).toBe('Login')
    expect(email instanceof HTMLElement).toBeTruthy();
    expect(password instanceof HTMLElement).toBeTruthy();
    expect(loginButton instanceof HTMLElement).toBeTruthy();
  });

  it('should accept valid user data', async (() => {
    sendInput(email, 'a@b.c').then(() => {
      sendInput(password, '123').then(() => {
        mockRouter.navigateByUrl.and.callFake(() => {
          fixture.detectChanges();
          expect(mockStorage.set.calls.count()).toBe(2);
          expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
        })
        mockStorage.set.and.returnValue(Promise.resolve());
        loginButton.click();
      });
    });
  }));

});
