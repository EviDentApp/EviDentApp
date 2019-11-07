import { async } from '@angular/core/testing';
import { createTestBed, createFixture, component, fixture, waitForCondition } from '../fixtures.spec';
import { TextDetailPage } from './text-detail.page';

describe('TextDetailPage', () => {
  let likes, dislikes;

  beforeEach(async(() => {
    let mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['get']);
    mockActivatedRoute.get.and.returnValue('5db87816f81c26070c785b05');
    createTestBed(TextDetailPage, { mockActivatedRoute: mockActivatedRoute });
  }));

  beforeEach(async(() => {
    createFixture(TextDetailPage);
    waitForCondition(() => component.detail != null).then(() => {
      console.log(component.detail);
      fixture.detectChanges();
      let dom = fixture.nativeElement;
      likes = dom.querySelector('span#likes');
      dislikes = dom.querySelector('span#dislikes');
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get UI components', () => {
    console.log(dislikes)
    expect(likes.textContent).toBe('0')
    expect(dislikes.textContent).toBe('0')
    expect(likes instanceof HTMLElement).toBeTruthy();
    expect(dislikes instanceof HTMLElement).toBeTruthy();
    console.log('testei');
  });

});
