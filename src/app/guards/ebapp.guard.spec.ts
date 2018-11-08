import { TestBed, async, inject } from '@angular/core/testing';

import { EbappGuard } from './ebapp.guard';

describe('EbappGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EbappGuard]
    });
  });

  it('should ...', inject([EbappGuard], (guard: EbappGuard) => {
    expect(guard).toBeTruthy();
  }));
});
