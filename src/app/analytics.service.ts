import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


const DIM_AGE = 1;
const DIM_GENDER = 2;
const DIM_GRADE_YEAR = 3;
const DIM_GRADE_STATE = 4;
const DIM_VIEWED_TEXT_DETAIL = 5;
const DIM_VIEWED_PAPER = 6;
const DIM_VIEWED_METODOLOGY = 7;
const DIM_OCCUPATION = 8;
const DIM_WORK_STATE = 9;
const DIM_APP_AD = 10;

const METRIC_PAPER_VIEWS = 1;
const METRIC_TEXT_DETAIL_VIEWS = 2;
const METRIC_METODOLOGY_VIEWS = 3;


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private user;

  constructor(
    private storage: Storage,
    private ga: GoogleAnalytics
  ) { }

  startTracking() {
    this.ga.startTrackerWithId('UA-148652262-1');
  }

  private async getData() {
    let user_str = await this.storage.get('user');
    this.user = JSON.parse(user_str);
  }

  private async setUserDimensions() {
    if (!this.user) {
      await this.getData();
    }
    await this.ga.addCustomDimension(DIM_AGE, this.user.age);
    await this.ga.addCustomDimension(DIM_GENDER, this.user.gender);
    await this.ga.addCustomDimension(DIM_GRADE_YEAR, this.user.grade_year);
    await this.ga.addCustomDimension(DIM_GRADE_STATE, this.user.grade_state);
    await this.ga.setUserId(this.user._id);
    await this.ga.addCustomDimension(DIM_OCCUPATION, this.user.occupation ? this.user.occupation : 'NAO_DEFINIDO')
    await this.ga.addCustomDimension(DIM_WORK_STATE, this.user.work_state ? this.user.work_state : 'NAO_DEFINIDO')
    await this.ga.addCustomDimension(DIM_APP_AD, this.user.app_ad ? this.user.app_ad : 'NAO_DEFINIDO')
  }

  public async trackPaperVisualization(title: string) {
    await this.setUserDimensions();
    await this.ga.addCustomDimension(DIM_VIEWED_PAPER, title);
    this.ga.trackMetric(METRIC_PAPER_VIEWS, 1).catch ( erro => alert(erro));
    this.ga.trackEvent(title, 'vizualização do paper')
  }

  public async trackTextDetailVisualization(title: string) {
    await this.setUserDimensions();
    await this.ga.addCustomDimension(DIM_VIEWED_TEXT_DETAIL, title);
    this.ga.trackMetric(METRIC_TEXT_DETAIL_VIEWS, 1).catch ( erro => alert(erro));
    this.ga.trackEvent(title, 'vizualização do texto')
  }

  public async trackMetodologyVisualization(metodology_title: string, text_title: string) {
    await this.setUserDimensions();
    await this.ga.addCustomDimension(DIM_VIEWED_METODOLOGY, metodology_title);
    await this.ga.addCustomDimension(DIM_VIEWED_TEXT_DETAIL, text_title);
    this.ga.trackMetric(METRIC_METODOLOGY_VIEWS, 1).catch ( erro => alert(erro));
    this.ga.trackEvent(metodology_title, 'vizualização da metodologia')
  }
 
}
