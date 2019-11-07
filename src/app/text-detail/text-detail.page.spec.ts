import { async } from '@angular/core/testing';
import { createTestBed, component, fixture, waitForCondition } from '../fixtures.spec';
import { TextDetailPage } from './text-detail.page';

describe('TextDetailPage', () => {
  let likes, dislikes, likeButton, likeButtonInactive, dislikeButton, dislikeButtonInactive;
  let dom

  function updateButtons() {
    fixture.detectChanges();
    likes = dom.querySelector('span#likes');
    dislikes = dom.querySelector('span#dislikes');
    likeButton = dom.querySelector('#likeButton')
    likeButtonInactive = dom.querySelector('#likeButtonInactive')
    dislikeButton = dom.querySelector('#dislikeButton')
    dislikeButtonInactive = dom.querySelector('#dislikeButtonInactive')
  }

  beforeEach(async(() => {
    let mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['get']);
    mockActivatedRoute.get.and.returnValue('5db87816f81c26070c785b05');
    let mockStorage = jasmine.createSpyObj('Storage', ['get']);
    mockStorage.get.and.returnValue('{"_id": "5db879fef81c26070c785b06"}');
    createTestBed(TextDetailPage, { mockActivatedRoute: mockActivatedRoute,
        mockStorage: mockStorage });
    waitForCondition(() => component.detail != null).then(() => {
      fixture.detectChanges();
      dom = fixture.nativeElement;
      updateButtons();
    });
  }));

  afterEach(() => {
    if (dislikeButton) {
      dislikeButton.click();
    }
    else if (likeButton) {
      likeButton.click();
    }
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get likes and dislikes on load', () => {
    expect(likes.textContent).toBe('0')
    expect(dislikes.textContent).toBe('0')
  });

  it('should give like', (done) => {
    likeButtonInactive.click();
    waitForCondition(() => component.like == 'like').then(() => {
      updateButtons();
      expect(likes.textContent).toBe('1')
      expect(dislikes.textContent).toBe('0')
      expect(likeButton).toBeTruthy();
      expect(likeButtonInactive).toBeNull();
      expect(dislikeButton).toBeNull();
      expect(dislikeButtonInactive).toBeTruthy();
      done();
    });
  });

  it('should give dislike', (done) => {
    dislikeButtonInactive.click();
    waitForCondition(() => component.like == 'dislike').then(() => {
      updateButtons();
      expect(likes.textContent).toBe('0')
      expect(dislikes.textContent).toBe('1')
      expect(likeButton).toBeNull();
      expect(likeButtonInactive).toBeTruthy();
      expect(dislikeButton).toBeTruthy();
      expect(dislikeButtonInactive).toBeNull();
      done();
    });
  });

  it('should change like to dislike', (done) => {
    likeButtonInactive.click();
    waitForCondition(() => component.like == 'like').then(() => {
      dislikeButtonInactive.click();
      waitForCondition(() => component.like == 'dislike').then(() => {
        updateButtons();
        expect(likes.textContent).toBe('0')
        expect(dislikes.textContent).toBe('1')
        expect(likeButton).toBeNull();
        expect(likeButtonInactive).toBeTruthy();
        expect(dislikeButton).toBeTruthy();
        expect(dislikeButtonInactive).toBeNull();
        done();
      });
    });
  });

});