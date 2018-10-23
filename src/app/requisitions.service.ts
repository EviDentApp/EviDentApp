import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class RequisitionsService {
 
  private endpoint = "https://ebapp.herokuapp.com" 
  private bodyThemesList = { "key": '123' }
  private bodyTextList = {
                          "key": '123',
                          "theme": "",
                          "keyword": ''
                        }

  private bodyTextDetail = {
                          "key": '123',
                          "_id": 0
                        }

  private bodyMethodologyDetail = {
                                  "key": '123',
                                  "_id": 0
  }

  constructor(public http: Http,
              ) {
  }

  themesGetList () {
    //eturn this.httpNative.post(this.endpoint + "/themes/list", this.bodyThemesList, {})
    return this.http.post(this.endpoint + "/themes/list", this.bodyThemesList);
  }

  textGetList(theme='', keyword='') {
    this.bodyTextList.theme = theme;
    this.bodyTextList.keyword = keyword;
    return this.http.post(this.endpoint + "/text/search", this.bodyTextList);
  }

  textGetDetail(text_id) {
    this.bodyTextDetail._id = text_id;
    return this.http.post(this.endpoint + "/text/detail", this.bodyTextDetail);
  }

  methodologyGetDetail(metho_id) {
    this.bodyMethodologyDetail._id = metho_id;
    return this.http.post(this.endpoint + "/methodology/detail", this.bodyMethodologyDetail);
  }
}
