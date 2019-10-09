import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

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

  async trackEvent(category, action) {
    if (!this.user_id) {
      await this.getData();
    }
    await this.ga.addCustomDimension(1, this.age);
    await this.ga.addCustomDimension(2, this.gender);
    await this.ga.addCustomDimension(3, this.grade_year);
    await this.ga.addCustomDimension(4, this.grade_state);
    await this.ga.setUserId(this.user_id);
    await this.ga.trackEvent(category, action, '', 1);
    await this.ga.trackMetric(1, 1);
  }

}
