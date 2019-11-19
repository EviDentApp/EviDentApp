import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySavedTextsPage } from './my-saved-texts.page';

describe('MySavedTextsPage', () => {
  let component: MySavedTextsPage;
  let fixture: ComponentFixture<MySavedTextsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySavedTextsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySavedTextsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
