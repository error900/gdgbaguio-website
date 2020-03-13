import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { meetupOAuthURL } from '../config/meetup-api-url';
import { oauthResponse } from '../model/meetup-oauth2.model';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/core/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class MeetupAuthService {
  oauthResponse: oauthResponse;
  oauthToken: any;
  token_type: any;
  oauthTokenRefresh: any;

  constructor(private http: HttpClient, private afs: AngularFirestore) { }

  getAuthorizationToken() {
    return window.location.href = meetupOAuthURL.authorize + '?client_id=' + environment.meetup.consumer_key + '&response_type=token&redirect_uri=' + environment.meetup.redirect_uri;
  }

  // getAuthorizationToken() {
  //   const payload = new HttpParams()
  //     .append('client_id', environment.meetup.consumer_key)
  //     .append('client_secret', environment.meetup.consumer_secret)
  //     .append('grant_type', environment.meetup.type_auth)
  //     .append('redirect_uri', environment.meetup.redirect_uri)
  //     .append('code', environment.meetup.code)

  //   return this.http.post(meetupOAuthURL.access, payload, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   }).subscribe(response => {
  //     this.oauthResponse = response;
  //   });
  // }

  updateUserMeetupSignin(uid) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`google-accounts/${uid}`);
    return userRef.update({
      meetupSignin: true
    });
  }

  refreshToken() {
    const payload = new HttpParams()
      .append('grant_type', environment.meetup.type_refresh)
      .append('code', environment.meetup.code)
      .append('redirect_uri', environment.meetup.redirect_uri)
      .append('client_id', environment.meetup.consumer_key);

    return this.http.post(meetupOAuthURL.access, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).subscribe(response => {
      this.oauthTokenRefresh = response;
    });
  }
}
