import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


const DIM_AGE = 1;
const DIM_GENDER = 2;
const DIM_GRADE_YEAR = 3;
const DIM_GRADE_STATE = 4;
const DIM_CLICKED_LINK = 5;
const DIM_VIEWED_PAPER = 6;

const METRIC_PAPER_VIEWS = 1;
const METRIC_LINK_CLICKS = 2;


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private user_id;
  private gender;
  private age;
  private grade_year;
  private grade_state;

  constructor(
    private storage: Storage,
    private ga: GoogleAnalytics
  ) { }

  private async getData() {
    let user_str = await this.storage.get('user');
    let user = JSON.parse(user_str);
    this.user_id = user._id;
    this.gender = user.gender;
    this.age = (new Date().getFullYear()) - user.birth_year;
    this.grade_year = user.grade_year;
    this.grade_state = user.grade_state;
  }

  private async setUserDimensions() {
    if (!this.user_id) {
      await this.getData();
    }
    await this.ga.addCustomDimension(DIM_AGE, this.age);
    await this.ga.addCustomDimension(DIM_GENDER, this.gender);
    await this.ga.addCustomDimension(DIM_GRADE_YEAR, this.grade_year);
    await this.ga.addCustomDimension(DIM_GRADE_STATE, this.grade_state);
    await this.ga.setUserId(this.user_id);
  }

  public async trackPaperVisualization(title: string) {
    await this.setUserDimensions();
    await this.ga.addCustomDimension(DIM_VIEWED_PAPER, title);
    await this.ga.trackMetric(METRIC_PAPER_VIEWS, 1);
  }

}
