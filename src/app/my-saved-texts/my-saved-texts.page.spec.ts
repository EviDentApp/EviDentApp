import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySavedTextsPage } from './my-saved-texts.page';
import { SavedTextsService } from '../saved-texts.service';
import { createTestBed, component, fixture } from '../fixtures.spec';

describe('MySavedTextsPage', () => {
  beforeEach(async(() => {
    createTestBed(MySavedTextsPage { mockSavedTexts: {
      all: () => { 
        then: () => { }
      }
    }});
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
