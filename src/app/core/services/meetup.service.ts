import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { meetupApiURL, conf } from '../config/meetup-api-url';
import {
  plannedEvent,
  recentEvent,
  pastEvent,
  draftEvent,
  eventInfo,
  memberRSVP
} from '../model/events.model';

import { MeetupAuthService } from './meetup-auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'a4c8f42439806d48f874ebe10908f1c2'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MeetupService {
  oauthResponse: MeetupAuthService;
  access_token = '&access_token=bfe2bcd58e13abcbfbeb4999f8053083&';

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  getDate() {
    const datetime = new Date();
    datetime.setDate(datetime.getDate() - 1);
    return datetime.toISOString().slice(0, -1);
  }

  // GET

  sitePlannedMeetupEvents(): Observable<plannedEvent[]> {
    return this.http.get<plannedEvent[]>(meetupApiURL.eventOngoingUpcoming)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  siteRecentMeetupEvents(): Observable<recentEvent[]> {
    return this.http.get<recentEvent[]>(meetupApiURL.eventRecent)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  sitePastMeetupEvents(): Observable<pastEvent[]> {
    const datetime = this.getDate();
    return this.http.get<pastEvent[]>(meetupApiURL.pastEvents + datetime)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  siteMeetupEventDetails(event_id: string): Observable<eventInfo> {
    return this.http.get<eventInfo>(conf.event + '/' + event_id + meetupApiURL.eventDetailsParams + this.access_token)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  dashboardDraftMeetupEvents(): Observable<draftEvent[]> {
    return this.http.get<draftEvent[]>(meetupApiURL.eventDraft + this.access_token)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  meetupRSVP(event_id: string): Observable<memberRSVP[]> {
    return this.http.get<memberRSVP[]>(conf.event + '/' + event_id + meetupApiURL.memberRSVP)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // POST

  attendanceTaking(event_id: number, member_id: number, status: string) {
    // attendanceTaking: '/gdgbaguio/events/:id/attendance?member=&status=',
    const url = conf.event + '/' + event_id + '/attendance?member=' + member_id + '&status=' + status;
    return url;
  }

  // getAccessToken(code: string) {

  //   const payload = new HttpParams()
  //     .append('grant_type', 'authorization_code')
  //     .append('code', code)
  //     .append('redirect_uri', 'http://localhost:4200/oauth/callback')
  //     .append('client_id', 'api');

  //   this.http.post('http://192.168.10.10:3000/oauth/access_token', payload, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   }).subscribe(response => {
  //     this.oauthResponse = response;
  //   });
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
