import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextByThemesPage } from './text-by-themes.page';

describe('TextByThemesPage', () => {
  let component: TextByThemesPage;
  let fixture: ComponentFixture<TextByThemesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextByThemesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextByThemesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
});
