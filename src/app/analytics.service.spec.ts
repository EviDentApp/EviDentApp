import { TestBed, inject } from '@angular/core/testing';
import { AnalyticsService } from './analytics.service';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

describe('AnalyticsService', () => {
  beforeEach(() => {
    const mockStorage = jasmine.createSpyObj('Storage', ['get', 'set'])
    const mockGoogleAnalytics = jasmine.createSpyObj('GoogleAnalytics', ['startTrackerWithId',
     'setUserId',  'addCustomDimension', 'trackMetric', 'trackEvent'])
    TestBed.configureTestingModule({
      providers: [AnalyticsService, 
        {provide: Storage, useValue: mockStorage},
        {provide: GoogleAnalytics, useValue: mockGoogleAnalytics}]
    });
  });

  it('should be created', inject([AnalyticsService], (service: AnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});
