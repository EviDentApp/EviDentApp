import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDetailPage } from './text-detail.page';

describe('TextDetailPage', () => {
  let component: TextDetailPage;
  let fixture: ComponentFixture<TextDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
