import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodologyDetailPage } from './methodology-detail.page';

describe('MethodologyDetailPage', () => {
  let component: MethodologyDetailPage;
  let fixture: ComponentFixture<MethodologyDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodologyDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodologyDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
