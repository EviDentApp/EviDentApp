import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class RequisitionsService {
  private endpoint = "http://localhost:5000" 
  private bodyThemesList = { "key": 123 }

  constructor(public http: Http) {
    console.log('Hello requisitions');
  }

  themesGetList () {
    return this.http.post (this.endpoint + "/themes/list?key=123", this.bodyThemesList);
  }


}
