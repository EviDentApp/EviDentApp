import { async } from '@angular/core/testing';

import { EbappGuard } from './ebapp.guard';

describe('EbappGuard', () => {

  let storage, router, guard;

  beforeEach(() => {
    storage = jasmine.createSpyObj('Storage', {'get': false});
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    guard = new EbappGuard(storage, router);
  });
 
  it('should create the guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should query for tutorialComplete in Storage', () => {
    guard.canActivate().then((value) => {
      expect(value).toEqual(false);
      expect(storage.get).toHaveBeenCalledTimes(1);
      expect(storage.get).toHaveBeenCalledWith('tutorialComplete');
    });
  });

  it('should navigate to /intro if tutorial is not complete', () => {
    guard.canActivate().then((value) => {
      expect(value).toEqual(false);
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/intro');
    });
  });

  it('should not navigate to /intro if tutorial is complete', () => {
    storage = jasmine.createSpyObj('Storage', {'get': true});
    guard = new EbappGuard(storage, router);
    guard.canActivate().then((value) => {
      expect(value).toEqual(true);
      expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
    });
  });

});
