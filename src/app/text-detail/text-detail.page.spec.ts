import { async } from '@angular/core/testing';
import { createTestBed, component, fixture, waitForCondition } from '../fixtures.spec';
import { TextDetailPage } from './text-detail.page';

describe('TextDetailPage', () => {
  let likes, dislikes, likeButton, likeButtonInactive, dislikeButton, dislikeButtonInactive;

  beforeEach(async(() => {
    let mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['get']);
    mockActivatedRoute.get.and.returnValue('5db87816f81c26070c785b05');
    let mockStorage = jasmine.createSpyObj('Storage', ['get']);
    mockStorage.get.and.returnValue('{"_id": "5db879fef81c26070c785b06"}');
    createTestBed(TextDetailPage, { mockActivatedRoute: mockActivatedRoute,
        mockStorage: mockStorage });
    waitForCondition(() => component.detail != null).then(() => {
      fixture.detectChanges();
      let dom = fixture.nativeElement;
      likes = dom.querySelector('span#likes');
      dislikes = dom.querySelector('span#dislikes');
      likeButton = dom.querySelector('#likeButton')
      likeButtonInactive = dom.querySelector('#likeButtonInactive')
      dislikeButton = dom.querySelector('#dislikeButton')
      dislikeButtonInactive = dom.querySelector('#dislikeButtonInactive')
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get likes and dislikes on load', () => {
    fixture.detectChanges();
    expect(likes.textContent).toBe('1')
    expect(dislikes.textContent).toBe('0')
    expect(likeButton).toBeTruthy();
    expect(likeButtonInactive).toBeNull();
    expect(dislikeButton).toBeNull();
    expect(dislikeButtonInactive).toBeTruthy();
  });


  it('should update likes and dislikes count', () => {
    fixture.detectChanges();
    console.log(likeButton)
    console.log(likeButtonInactive)
    console.log(dislikeButton)
    console.log(dislikeButtonInactive)

    expect(likes.textContent).toBe('1')
    expect(dislikes.textContent).toBe('0')
  });

});
