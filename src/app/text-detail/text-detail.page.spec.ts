import { async } from '@angular/core/testing';
import { createTestBed, component, fixture } from '../fixtures.spec';
import { TextDetailPage } from './text-detail.page';

describe('TextDetailPage', () => {
  let likes, dislikes;

  beforeEach(async () => {
    let mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['get']);
    mockActivatedRoute.get.and.returnValue('5db87816f81c26070c785b05');
    await createTestBed(TextDetailPage, { mockActivatedRoute: mockActivatedRoute });
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get UI components', (done) => {
    setTimeout(() => {
      fixture.detectChanges();
      let dom = fixture.nativeElement;
      likes = dom.querySelector('span#likes');
      dislikes = dom.querySelector('span#dislikes');
      console.log(dislikes)
      expect(likes.textContent).toBe('0')
      expect(dislikes.textContent).toBe('0')
      expect(likes instanceof HTMLElement).toBeTruthy();
      expect(dislikes instanceof HTMLElement).toBeTruthy();
      console.log('testei');
      done();
    }, 1000);
  });

});
