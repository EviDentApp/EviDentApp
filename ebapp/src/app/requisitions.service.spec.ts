import { TestBed, inject } from '@angular/core/testing';

import { RequisitionsService } from './requisitions.service';

describe('RequisitionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequisitionsService]
    });
  });

  it('should be created', inject([RequisitionsService], (service: RequisitionsService) => {
    expect(service).toBeTruthy();
  }));
});
