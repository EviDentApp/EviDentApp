import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpModule } from '@angular/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { IonicStorageModule } from '@ionic/storage'
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RequisitionsService } from './requisitions.service';
import { AnalyticsService } from './analytics.service';
import { SavedTextsService } from './saved-texts.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    RouterModule.forRoot([]),
    IonicStorageModule.forRoot()
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    RequisitionsService,
    GoogleAnalytics,
    Facebook,
    AnalyticsService,
    SQLite,
    SavedTextsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
