import { LoginPage } from './login.page';

import { createTestBed, component, sendInput, fixture, mockStorage } from '../fixtures.spec';

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

  it('should accept valid user data', () => {
    sendInput(email, 'oi kkk').then(() => {
      sendInput(password, 'rsrsrsrs').then(() => {
        loginButton.click();
        fixture.detectChanges();
        expect(mockStorage.set.calls.count()).toBe(1);
      });
    });
  });

});
