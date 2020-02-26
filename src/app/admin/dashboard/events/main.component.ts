import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { EventsService } from '../../../core/services/events.service';
import { MeetupService } from '../../../core/services/meetup.service';
import { draftEvent, plannedEvent, FirebaseEvent, FirebaseEventDocumentI, FirebaseEventDocument } from 'src/app/core/model/events.model';

import { MDCDialog } from '@material/dialog';

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

  meetupEvents: FirebaseEventDocumentI[];

  constructor(public auth: AuthenticationService, private meetupService: MeetupService, private eventService: EventsService) {
  // constructor(public meetupService: MeetupService, private eventService: EventsService) {
  }

  ngOnInit() {
    // MEETUP
    this.getPlannedEvents();
    this.getDratGDGEvents();
    this.getFirebaseEvents();
    console.log(this.meetupService.attendanceTaking(0, 0, 'status'));

    // const dialog = new MDCDialog(document.querySelector('#draft-view-dialog'));
    // // const list = new MDCList(document.querySelector('.#draft-view-dialog .mdc-list'));

    // dialog.listen('MDCDialog:opened', () => {
    //   // list.layout();
    // });

    // const buttonEl2 = document.querySelector('#draft-view-button');
    // buttonEl2.addEventListener('click', (event) => {
    //   dialog.open();
    //   console.log('DRAFT BUTTON');
    // });

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
          this.ongoingEvents = this.getOngoingEvents(this.plannedEvents),
          this.ongoingEvents_count = this.ongoingEvents.length,
          console.log('ONGOING', this.ongoingEvents),
          console.log('ONGOING', this.ongoingEvents_count),
          this.upcomingEvents = this.getUpcomingEvents(this.plannedEvents),
          this.upcomingEvents_count = this.upcomingEvents.length,
          console.log('UPCOMING', this.upcomingEvents),
          console.log('UPCOMING', this.upcomingEvents_count)
        )
      );
  }

  getOngoingEvents(arr: plannedEvent[]) {
    let ongoingEvents = [];
    var obj = {} as plannedEvent;
    for (let index = 0; index < arr.length; index++) {
      obj = arr[index];
      if (obj.status == 'ongoing') {
        ongoingEvents.push(obj);
      }
    }
    return ongoingEvents;
  }

  getUpcomingEvents(arr: plannedEvent[]) {
    let upcomingEvents = [];
    var obj = {} as plannedEvent;
    for (let index = 0; index < arr.length; index++) {
      obj = arr[index];
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
        city: 'Baguio City'
      },
      uc: {
        name: 'University of the Cordilleras',
        address_1: 'University of the Cordilleras, Baguio City',
        city: 'Baguio City'
      },
      ub: {
        name: 'University of Baguio',
        address_1: 'University of Baguio, Baguio City',
        city: 'Baguio City'
      },
      bsu: {
        name: 'Benguet State University',
        address_1: 'La Trinidad, Benguet',
        city: 'Baguio City'
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
          this.meetupEvents = this.getMeetupEvents(this.meetupEvents),
          console.log('FINAL', this.meetupEvents)
        )
      );
  }


  // FIREBASE

  getMeetupEvents(arr: FirebaseEventDocumentI[]) {
    let featured_photo_placeholder = { highres_link: 'https://secure.meetupstatic.com/s/img/5455565085016210254/logo/svg/logo--script.svg' }
    let finalEvents = [];
    var obj = {} as FirebaseEventDocument;
    for (let index = 0; index < arr.length; index++) {
      obj = arr[index];
      // if (!obj.hasOwnProperty('featured_photo')) {
      //   obj.featured_photo = featured_photo_placeholder
      // }
      if (!obj.hasOwnProperty('manual_attendance_count')) {
        obj.manual_attendance_count = 0;
      }
      if (!obj.hasOwnProperty('description')) {
        obj.description = 'No description';
      }
      finalEvents.push(obj);
      // this.eventService.createEvent(obj);
    }
    return finalEvents;
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