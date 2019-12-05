import { TestBed, inject } from '@angular/core/testing';

import { SavedTextsService } from './saved-texts.service';

describe('SavedTextsService', () => {
  let service;

  beforeEach(() => {
    let mockPlt = jasmine.createSpyObj('Platform', ['ready']);
    let mockSQL = jasmine.createSpyObj('SQLite', ['create']);
    let mockReq = jasmine.createSpyObj('RequisitionsService', ['getImage']);
    service = new SavedTextsService(mockPlt, mockSQL, mockReq);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  }));
});
