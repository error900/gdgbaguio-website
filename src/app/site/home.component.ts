import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FirestoreEventsService } from '../core/services/firestore-events.service';
import { FirebaseEventInterface, event } from '../core/model/events.model';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'site-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  plannedEvents_count = 0;
  ongoingEvents_count = 0;
  upcomingEvents_count = 0;
  recentEvents_count = 0;
  pastEvents_count = 0;

  showRegisterButton = false;
  showWaitlistButton = false;

  firestoreEvents: FirebaseEventInterface[];
  firestoreOngoingEvents: event[];
  firestoreUpcomingEvents: event[];
  firestoreRecentEvents: event[];
  firestorePastEvents: event[];

  gdg_baguio_banner = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/community-photo/3.jpg';
  talks = '../../assets/images/activities/talks.png';
  codelabs = '../../assets/images/activities/codelabs.png';
  roadshow = '../../assets/images/activities/roadshow.png';
  live_viewing = '../../assets/images/activities/live-viewing.png';

  android_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/android.png';
  angular_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/angular.png';
  cloud_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/cloud.png';
  firebase_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/firebase.png';
  golang_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/go.png';
  gsuite_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/gsuite.png';
  kotlin_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/kotlin.png';
  md_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/mdc.png';
  wtm_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/wtm.png';
  cardboard_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/vr.png';

  womentechmakers_ambassador_photo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/account-photo/kim.jpg';
  wtm = '../../assets/images/wtm-logo-horiz-rgb.svg';

  constructor(public auth: AuthenticationService, private firestoreService: FirestoreEventsService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.FirestoreMeetupEvents();
  }

  public sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // FIRESTORE

  FirestoreMeetupEvents() {
    this.firestoreService.getFirestoreEvents().snapshotChanges().pipe(
      map(changes =>
        changes.map(
          c => ({
            key: c.payload.doc.id, ...c.payload.doc.data()
          })
        )
      )
    ).subscribe(
      firestoreEvents => {
        this.firestoreEvents = firestoreEvents;
        this.firestoreEvents = this.firestoreEvents.reverse();
        this.firestoreOngoingEvents = this.getOngoingMeetupEvents(this.firestoreEvents);
        this.ongoingEvents_count = this.firestoreOngoingEvents.length;
        this.firestoreUpcomingEvents = this.getUpcomingMeetupEvents(this.firestoreEvents).reverse();
        this.upcomingEvents_count = this.firestoreUpcomingEvents.length;
      }
    );
  }

  getOngoingMeetupEvents(arr: FirebaseEventInterface[]) {
    let ongoingEvents = [];
    var obj = {} as event;
    for (let index = 0; index < arr.length; index++) {
      obj = arr[index];
      if (arr[index].status == 'ongoing') {
        obj.id = arr[index].id;
        obj.name = arr[index].name;
        obj.local_date = arr[index].local_date;
        obj.rsvp_limit = arr[index].rsvp_limit;
        obj.waitlist_count = arr[index].waitlist_count;
        obj.yes_rsvp_count = arr[index].yes_rsvp_count;
        obj.venue = arr[index].venue;
        obj.link = arr[index].link;
        obj.description = arr[index].description.slice(0, 150).concat(' ...');
        ongoingEvents.push(obj);
      }
    }
    return ongoingEvents;
  }

  getUpcomingMeetupEvents(arr: FirebaseEventInterface[]) {
    let upcomingEvents = [];
    var obj = {} as event;
    for (let index = 0; index < arr.length; index++) {
      obj = arr[index];
      if (arr[index].status == 'upcoming') {
        obj.id = arr[index].id;
        obj.name = arr[index].name;
        obj.local_date = arr[index].local_date;
        obj.rsvp_limit = arr[index].rsvp_limit;
        obj.waitlist_count = arr[index].waitlist_count;
        obj.yes_rsvp_count = arr[index].yes_rsvp_count;
        obj.venue = arr[index].venue;
        obj.link = arr[index].link;
        obj.description = arr[index].description.slice(0, 150).concat(' ...');
        upcomingEvents.push(obj);
        if (!(arr[index].rsvp_limit >= arr[index].yes_rsvp_count)) {
          this.showWaitlistButton = true;
        } else {
          this.showRegisterButton = true;
        }
      }
    }
    return upcomingEvents;
  }

}
