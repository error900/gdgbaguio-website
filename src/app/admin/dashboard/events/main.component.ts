import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { MeetupAuthService } from 'src/app/core/services/meetup-auth.service';
import { EventsService } from '../../../core/services/events.service';
import { MeetupService } from '../../../core/services/meetup.service';
import { FirestoreEventsService } from 'src/app/core/services/firestore-events.service';
import { draftEvent, plannedEvent, FirebaseEvent, FirebaseEventInterface, FirebaseEventHost, eventInfo } from 'src/app/core/model/events.model';

import { MDCDialog } from '@material/dialog';
import { User } from 'src/app/core/model/user.model';

@Component({
  selector: 'meetup-events-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class EventsDashboardComponent implements OnInit {
  events: any;
  event: FirebaseEvent = new FirebaseEvent();
  eventSubmitted = false;

  plannedEvents: plannedEvent[];
  ongoingEvents: plannedEvent[];
  upcomingEvents: plannedEvent[];
  draftEvents: draftEvent[];
  plannedEvents_count = 0;
  ongoingEvents_count = 0;
  upcomingEvents_count = 0;
  draftEvents_count = 0;

  meetupEvents: FirebaseEventInterface[];
  meetupOngoingEvents: FirebaseEventInterface[];
  meetupUpcomingEvents: FirebaseEventInterface[];

  eventDetails: eventInfo;
  eventids: string[];

  constructor(public meetupOAuth: MeetupAuthService, public auth: AuthenticationService, private meetupService: MeetupService, private eventService: EventsService, private firestoreService: FirestoreEventsService) { }

  ngOnInit() {
    // MEETUP
    this.getPlannedEvents(); // meetup events
    this.getDratGDGEvents(); // meetup events
    // this.getFirebaseEvents(); // merge meetup events to firestore

    // console.log(this.meetupService.attendanceTaking(0, 0, 'status'));
  }

  // MEETUP

  getPlannedEvents() {
    this.meetupService.sitePlannedMeetupEvents()
      .subscribe(
        plannedEvents => (
          this.plannedEvents = plannedEvents,
          this.plannedEvents_count = plannedEvents.length,
          console.log('PLANNED', this.plannedEvents),
          console.log('PLANNED', this.plannedEvents_count),
          this.ongoingEvents = this.getOngoingEvents(this.plannedEvents).reverse(),
          this.ongoingEvents_count = this.ongoingEvents.length,
          console.log('ONGOING', this.ongoingEvents),
          console.log('ONGOING', this.ongoingEvents_count),
          this.upcomingEvents = this.getUpcomingEvents(this.plannedEvents).reverse(),
          this.upcomingEvents_count = this.upcomingEvents.length,
          console.log('UPCOMING', this.upcomingEvents),
          console.log('UPCOMING', this.upcomingEvents_count)
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
      if (obj.status == 'upcoming') {
        upcomingEvents.push(obj);
      }
    }
    return upcomingEvents;
  }

  getDratGDGEvents() {
    this.meetupService.dashboardDraftMeetupEvents()
      .subscribe(
        draftEvents => (
          this.draftEvents = draftEvents,
          this.draftEvents_count = draftEvents.length
        )
      );
  }

  getFirebaseEvents() {
    let venue = {
      slu: {
        name: 'Saint Louis University',
        address_1: 'Mary Heights, Bakakeng, Baguio City',
        city: 'Baguio City',
        localized_country_name: 'Philippines'
      },
      uc: {
        name: 'University of the Cordilleras',
        address_1: 'University of the Cordilleras, Baguio City',
        city: 'Baguio City',
        localized_country_name: 'Philippines'
      },
      ub: {
        name: 'University of Baguio',
        address_1: 'University of Baguio, Baguio City',
        city: 'Baguio City',
        localized_country_name: 'Philippines'
      },
      bsu: {
        name: 'Benguet State University',
        address_1: 'La Trinidad, Benguet',
        city: 'Baguio City',
        localized_country_name: 'Philippines'
      }
    }

    this.meetupService.meetupEvent()
      .subscribe(
        meetupEvents => (
          this.meetupEvents = meetupEvents,
          // FIX events with NO locations
          // this.meetupEvents.reverse(),
          // this.meetupEvents[0].venue = venue.uc,
          // this.meetupEvents[3].venue = venue.ub,
          // this.meetupEvents[5].venue = venue.bsu,
          // this.meetupEvents[7].venue = venue.slu,
          // this.meetupEvents[8].venue = venue.slu,
          // this.meetupEvents.reverse(),
          console.log('FINAL', this.meetupEvents),
          this.eventids = this.getMeetupEvents(this.meetupEvents),
          console.log('IDS', this.eventids),
          this.getMeetupEventHosts(this.eventids)
        )
      );
  }

  // FIREBASE

  getMeetupEvents(arr: FirebaseEventInterface[]) {
    let featured_photo_placeholder = { highres_link: '/assets/images/meetup-logo.png' };
    var obj = {} as FirebaseEvent;
    var ids = [];

    for (let index = 0; index < arr.length; index++) {
      obj = arr[index];

      if (!obj.hasOwnProperty('featured_photo')) {
        obj.featured_photo = featured_photo_placeholder
      }
      if (!obj.hasOwnProperty('manual_attendance_count')) {
        obj.manual_attendance_count = 0;
      }
      if (!obj.hasOwnProperty('description')) {
        obj.description = 'No description';
      }
      ids.push(arr[index].id);
      this.firestoreService.mergeMeetupEventsToFirestore(obj);
    }
    return ids;
  }

  getMeetupEventHosts(arr: string[]) {
    for (let index = 0; index < arr.length; index++) {
      this.meetupService.siteMeetupEventDetails(arr[index])
        .subscribe(
          eventDetails => (
            this.eventDetails = eventDetails,
            this.getEventHosts(this.eventDetails)
          )
        );
    }
  }

  getEventHosts(e: eventInfo) {
    var obj = {} as FirebaseEventHost;
    obj.id = e.id;
    obj.event_hosts = e.event_hosts;

    console.log('HOSTS', obj);
    this.firestoreService.mergeMeetupEventHostsToFirestore(obj);
  }

  // getEvents() {
  //   this.eventService.getEvents().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(events => {
  //     this.events = events;
  //   });
  // }

  newEvent(): void {
    this.eventSubmitted = false;
    this.event = new FirebaseEvent();
  }

  saveEvent() {
    this.eventService.createEvent(this.event);
    this.event = new FirebaseEvent();
  }

  onEventSubmit() {
    this.eventSubmitted = true;
    this.saveEvent();
  }

  deleteEvent() {
    this.eventService
      .deleteEvent(this.events.key)
      .catch(err => console.log(err));
  }

}