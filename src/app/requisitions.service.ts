import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class RequisitionsService {
  public key = 'cd48e1c22de0961d5d1bfb14f8a66e006cfb1cfbf3f0c0f3'
  //public endpoint = "http://evident.tk" 
  public endpoint = "http://192.168.0.105:5000" 
  public bodyThemesList = { "key": this.key }
  public bodyTextList = {
                          "key": this.key,
                          "theme": "",
                          "keyword": ''
                        }

  public bodyTextDetail = {
                          "key": this.key,
                          "_id": 0,
                          "dentist_id": 0
                        }

  public bodyMethodologyDetail = {
                                  "key": this.key,
                                  "_id": 0
  }

  public bodyMethodologyArray = {"key": this.key,
                                 methodologies_list: []
  }

  public bodyFacebookId = {"key": this.key,
                           "facebook_id": ''
  }

  public bodyGoogleId = {"key": this.key,
                         "google_id": ''
  }

  public bodyDentistDetail = {
    "key": this.key,
  }

  public bodyLogin = {
    "key": this.key,
    "email": "",
    "email_password": ""
  }

  public bodyToogleLike = {
    "key": this.key,
    "state": '',
    "text_id": '',
    "dentist_id":''
  }

  constructor(
    public http: Http,
  ) { }

  themesGetList () {
    return this.http.post(this.endpoint + "/themes/list", this.bodyThemesList);
  }

  textGetList(theme='', keyword='') {
    this.bodyTextList.theme = theme;
    this.bodyTextList.keyword = keyword;
    return this.http.post(this.endpoint + "/text/search", this.bodyTextList);
  }

  textGetDetail(text_id, user_id) {
    this.bodyTextDetail._id = text_id;
    this.bodyTextDetail.dentist_id = user_id;
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
    this.bodyFacebookId.facebook_id = facebook_id
    var res = this.http.post(this.endpoint + "/dentists/", this.bodyFacebookId)
    return res
  }

  dentistGetByGoogle(google_id) {
    this.bodyGoogleId.google_id = google_id
    var res = this.http.post(this.endpoint + "/dentists/", this.bodyGoogleId)
    return res
  }

  dentistCreate(dentist_obj) {
    for(let attribute in dentist_obj) {
      this.bodyDentistDetail[attribute] = dentist_obj[attribute]
    }
    var res = this.http.post(this.endpoint + "/dentists/create", this.bodyDentistDetail);
    return res
  }

  dentistLogin(email, email_password) {
   this.bodyLogin.email = email;
   this.bodyLogin.email_password = email_password;
   var res = this.http.post(this.endpoint + "/dentists/login_email", this.bodyLogin);
   return res
  }
 
  toogleLike(state, text_id, dentist_id) {
    this.bodyToogleLike.state = state;
    this.bodyToogleLike.text_id = text_id;
    this.bodyToogleLike.dentist_id = dentist_id
    var res = this.http.post(this.endpoint + "/text/like", this.bodyToogleLike);
    return res
   }

}
