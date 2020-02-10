import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { meetupOAuthURL } from '../config/meetup-api-url';

@Injectable({
  providedIn: 'root'
})
export class MeetupAuthService {
  oauthResponse: any;
  oauthToken: any;
  oauthTokenRefresh: any;

  constructor(private http: HttpClient) { }

  getAuthorizationToken() {
    const payload = new HttpParams()
      .append('grant_type', environment.meetup.type_auth)
      .append('code', environment.meetup.code)
      .append('redirect_uri', environment.meetup.redirect_uri)
      .append('client_id', environment.meetup.consumer_key);

    return this.http.post(meetupOAuthURL.access, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).subscribe(response => {
      this.oauthResponse = response;
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
