import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class RequisitionsService {
  public key = this.utilFunctions.apiKey
  public endpoint = "https://ebapp.herokuapp.com" 
  public bodyThemesList = { "key": this.key }
  public bodyTextList = {
                          "key": this.key,
                          "theme": "",
                          "keyword": ''
                        }

  public bodyTextDetail = {
                          "key": this.key,
                          "_id": 0
                        }

  public bodyMethodologyDetail = {
                                  "key": this.key,
                                  "_id": 0
  }

  public bodyMethodologyArray = {"key": this.key,
                                 methodologies_list: []
  }

  constructor(public http: Http,
              public utilFunctions: UtilService) {
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
  methodologiesGetArray(metho_array) {
    this.bodyMethodologyArray.methodologies_list = metho_array;
    return this.http.post(this.endpoint + "/methodologies/selected", this.bodyMethodologyArray);
  }
}
