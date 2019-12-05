import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyticsService } from './analytics.service'
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpModule } from '@angular/http';
import { SavedTextsService } from './saved-texts.service';
import { AppComponent } from './app.component';
import { createTestBed, component, sendInput, fixture, mockStorage, 
  mockRouter, 
  mockPlt} from './fixtures.spec';

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy, mockAnalyticsService,
    mockSQLite, mockSavedTexts;

  beforeEach(async(() => {
    // createTestBed(AppComponent);
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    mockAnalyticsService = jasmine.createSpyObj('AnalyticsService', ['startTracking'])
    mockSavedTexts = jasmine.createSpyObj('SavedTextsService', ['startTracking'])
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
    platformSpy.backButton = of("")
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: AnalyticsService, useValue: mockAnalyticsService },
        { provide: SavedTextsService, useValue: mockSavedTexts }
      ],
      imports: [ RouterTestingModule.withRoutes([]),
      HttpModule
    ],
    }).compileComponents();
  }));

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });
});
