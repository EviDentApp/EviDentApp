import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedTextPage } from './saved-text.page';
import { component, fixture, createTestBed } from '../fixtures.spec';

describe('SavedTextPage', () => {

  beforeEach(async(() => {
    createTestBed(SavedTextPage);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
