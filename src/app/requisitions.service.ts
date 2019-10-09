import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class RequisitionsService {
  public key = this.utilFunctions.apiKey
  //public endpoint = "http://evident.tk" 
  public endpoint = "http://192.168.0.100:5000" 
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

  public bodyDentistDetail = {
    "key": this.key,
    "name": "",
    "facebook_id": null,
    "google_id": null,
    "email": "",
    "email_password": "",
    "birth_year": 0,
    "grade_year": 0,
    "gender": "",
    "grade_state": "",
  }

  constructor(public http: Http,
              public utilFunctions: UtilService) {
  }

  themesGetList () {
    //eturn this.httpNative.post(this.endpoint + "/themes/list", this.bodyThemesList, {})
    console.log("Requisitei")
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

  slideGetList(text_id) {
    var slideshow = this.http.get(this.endpoint + "/slideshow?text_id="+ text_id)
    return slideshow
  }

  dentistGetByFacebook(facebook_id) {
    var res = this.http.get(this.endpoint + "/dentists/?facebook_id="+ facebook_id)
    return res
  }

  dentistCreate(dentist_obj) {
    this.bodyDentistDetail.name = dentist_obj.name;
    this.bodyDentistDetail.facebook_id = dentist_obj.facebook_id;
    this.bodyDentistDetail.google_id = dentist_obj.google_id;
    this.bodyDentistDetail.email = dentist_obj.email;
    this.bodyDentistDetail.email_password = dentist_obj.email_password;
    this.bodyDentistDetail.birth_year = dentist_obj.birth_year;
    this.bodyDentistDetail.grade_year = dentist_obj.grade_year;
    this.bodyDentistDetail.gender = dentist_obj.gender;
    this.bodyDentistDetail.grade_state = dentist_obj.grade_state;
    var res = this.http.post(this.endpoint + "/dentists/create", this.bodyDentistDetail);
    return res
  }

}
