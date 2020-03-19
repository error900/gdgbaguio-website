import { Component, OnInit } from '@angular/core';

import { MeetupService } from '../../core/services/meetup.service';
import { FirestoreEventsService } from 'src/app/core/services/firestore-events.service';
import { plannedEvent, recentEvent, pastEvent, FirebaseEventInterface, event } from '../../core/model/events.model';
import { meetupApiURL } from 'src/app/core/config/meetup-api-url';
import { map } from 'rxjs/operators';

@Component({
  selector: 'site-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [MeetupService]
})
export class EventsComponent implements OnInit {
  plannedEvents: plannedEvent[];
  ongoingEvents: plannedEvent[];
  upcomingEvents: plannedEvent[];
  recentEvents: recentEvent[];
  pastEvents: pastEvent[];

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

  constructor(private meetupService: MeetupService, private firestoreService: FirestoreEventsService) { }

  ngOnInit() {
    // this.getPlannedGDGEvents();
    // this.getRecentGDGEvents();
    // this.getPastGDGEvents();
    console.log('api_url');
    this.FirestoreMeetupEvents();
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
        this.firestorePastEvents = this.getPastMeetupEvents(this.firestoreEvents);
        this.firestoreRecentEvents = this.getRecentMeetupEvents(this.firestorePastEvents);

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

  getRecentMeetupEvents(arr: event[]) {
    let recentEvents = [];
    var obj = {} as event;
    for (let index = 0; index < 3; index++) {
      obj = arr[index];
      recentEvents.push(obj);
    }
    return recentEvents;
  }

  getPastMeetupEvents(arr: FirebaseEventInterface[]) {
    let pastEvents = [];
    var obj = {} as event;
    for (let index = 0; index < arr.length; index++) {
      obj = arr[index];
      if (arr[index].status == 'past') {
        obj.id = arr[index].id;
        obj.name = arr[index].name;
        obj.local_date = arr[index].local_date;
        obj.rsvp_limit = arr[index].rsvp_limit;
        obj.waitlist_count = arr[index].waitlist_count;
        obj.yes_rsvp_count = arr[index].yes_rsvp_count;
        obj.venue = arr[index].venue;
        obj.link = arr[index].link;
        pastEvents.push(obj);
      }
    }
    return pastEvents;
  }

  // FIRESTORE

  // MEETUP

  getPlannedGDGEvents(): void {
    this.meetupService.sitePlannedMeetupEvents()
      .subscribe(
        plannedEvents => (
          this.plannedEvents = plannedEvents,
          this.plannedEvents_count = plannedEvents.length,
          this.ongoingEvents = this.getOngoingEvents(this.plannedEvents),
          this.ongoingEvents_count = this.ongoingEvents.length,
          this.upcomingEvents = this.getUpcomingEvents(this.plannedEvents),
          this.upcomingEvents_count = this.upcomingEvents.length
        )
      );
  }

  getOngoingEvents(arr: plannedEvent[]) {
    let featured_photo_placeholder = { highres_link: '/assets/images/meetup-logo.png' }
    let ongoingEvents = [];
    var obj = {} as plannedEvent;
    for (let index = 0; index < arr.length; index++) {
      obj = arr[index];
      if (!obj.hasOwnProperty('featured_photo')) {
        obj.featured_photo = featured_photo_placeholder
      }
      if (obj.status == 'ongoing') {
        ongoingEvents.push(obj);
      }
    }
    return ongoingEvents;
  }

  getUpcomingEvents(arr: plannedEvent[]) {
    let featured_photo_placeholder = { highres_link: '/assets/images/meetup-logo.png' }
    let upcomingEvents = [];
    var obj = {} as plannedEvent;
    for (let index = 0; index < arr.length; index++) {
      obj = arr[index];
      if (!obj.hasOwnProperty('featured_photo')) {
        obj.featured_photo = featured_photo_placeholder
      }
      if (!(obj.rsvp_limit >= obj.yes_rsvp_count)) {
        this.showWaitlistButton = true;
      } else {
        this.showRegisterButton = true;
      }
      if (obj.status == 'upcoming') {
        upcomingEvents.push(obj);
      }
    }
    return upcomingEvents;
  }

  getRecentGDGEvents(): void {
    this.meetupService.siteRecentMeetupEvents()
      .subscribe(
        recentEvents => {
          this.recentEvents = recentEvents,
            this.recentEvents_count = recentEvents.length
        }
      );
  }

  getPastGDGEvents(): void {
    let venue = {
      slu: {
        name: 'Saint Louis University',
        address_1: 'Mary Heights, Bakakeng, Baguio City'
      },
      uc: {
        name: 'University of the Cordilleras',
        address_1: 'University of the Cordilleras, Baguio City'
      },
      ub: {
        name: 'University of Baguio',
        address_1: 'University of Baguio, Baguio City'
      },
      bsu: {
        name: 'Benguet State University',
        address_1: 'La Trinidad, Benguet'
      }
    }

    this.meetupService.sitePastMeetupEvents()
      .subscribe(
        pastEvents => (
          this.pastEvents = pastEvents,
          this.pastEvents_count = this.pastEvents.length,
          // FIX events with NO locations
          this.pastEvents.reverse(),
          this.pastEvents[0].venue = venue.uc,
          this.pastEvents[3].venue = venue.ub,
          this.pastEvents[5].venue = venue.bsu,
          this.pastEvents[7].venue = venue.slu,
          this.pastEvents[8].venue = venue.slu,
          this.pastEvents.reverse(),
          console.log(this.pastEvents)
        )
      );
  }

}
