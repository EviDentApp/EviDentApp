import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedTextPage } from './saved-text.page';

describe('SavedTextPage', () => {
  let component: SavedTextPage;
  let fixture: ComponentFixture<SavedTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedTextPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
