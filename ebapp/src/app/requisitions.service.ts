import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class RequisitionsService {
 
  private endpoint = "https://ebapp.herokuapp.com" 
  private bodyThemesList = { "key": '123' }

  constructor(public http: Http) {
    console.log('Hello requisitions');
  }

  themesGetList () {
    return this.http.post (this.endpoint + "/themes/list", this.bodyThemesList);
  }


}
