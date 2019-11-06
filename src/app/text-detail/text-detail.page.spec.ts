import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createTestBed, component, sendInput, fixture, mockStorage, mockRouter } from '../fixtures.spec';
import { TextDetailPage } from './text-detail.page';

describe('TextDetailPage', () => {
  let likes, dislikes;

  beforeEach(async () => {
    await createTestBed(TextDetailPage);
    let dom = fixture.nativeElement;
    likes = dom.querySelector('#likes');
    dislikes = dom.querySelector('#dislikes');
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get UI components', () => {
    expect(likes.textContent).toBe('0')
    expect(dislikes.textContent).toBe('0')
    expect(dislikes instanceof HTMLElement).toBeTruthy();
    expect(likes instanceof HTMLElement).toBeTruthy();
  });

});
