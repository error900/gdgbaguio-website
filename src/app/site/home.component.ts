import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FirestoreService } from '../core/services/firestore.service';
import { FirebaseEventInterface, event } from '../core/model/events.model';
import { map } from 'rxjs/operators';

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
  activities_img = '../../assets/images/activities/google-codelabs.png';

  android_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Android-01.png';
  angular_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Angular-01.png';
  cloud_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Cloud-01.png';
  firebase_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Firebase-01.png';
  golang_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/GL-01.png';
  gsuite_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/GSuite-01.png';
  kotlin_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Kotlin-01.png';
  md_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/MD-01.png';
  wtm_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Women Techmakers-01.png';
  cardboard_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/VR-01.png';

  womentechmakers_ambassador_photo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/account-photo/kim.jpg';
  wtm = '../../assets/images/wtm-logo-horiz-rgb.svg';

  constructor(private firestoreService: FirestoreService, private sanitizer: DomSanitizer) { }

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
