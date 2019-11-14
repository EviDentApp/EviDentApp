import { TestBed, inject } from '@angular/core/testing';

import { SavedTextsService } from './saved-texts.service';

describe('SavedTextsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavedTextsService]
    });
  });

  it('should be created', inject([SavedTextsService], (service: SavedTextsService) => {
    expect(service).toBeTruthy();
  }));
});
