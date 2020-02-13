import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { EventsService } from '../../../core/services/events.service';

import { GDGBaguioEvent } from 'src/app/core/model/events.model';
import { MeetupService } from '../../../core/services/meetup.service';
import { meetupApiURL } from '../../../core/config/meetup-api-url';


@Component({
  selector: 'meetup-events-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class EventsDashboardComponent implements OnInit {
  events: any;
  event: GDGBaguioEvent = new GDGBaguioEvent();
  eventSubmitted = false;

  // pastEvents: dashboardPastGDGEvents[];

  // constructor(public auth: AuthenticationService, private meetupService: MeetupService, private eventService: EventsService) { }
  constructor(public meetupService: MeetupService, private eventService: EventsService) {
  }

  ngOnInit() {
    // this.getPastGDGEvents();
    console.log(this.meetupService.attendanceTaking(0,0,'status'));
  }

  // getPastGDGEvents() {
  //   this.meetupService.getDashboardPastGDGEvents()
  //     .subscribe(pastEvents => (this.pastEvents = pastEvents));
  // }

  // Firebase

  getEvents() {
    this.eventService.getEvents().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(events => {
      this.events = events;
    });
  }

  newEvent(): void {
    this.eventSubmitted = false;
    this.event = new GDGBaguioEvent();
  }

  saveEvent() {
    this.eventService.createEvent(this.event);
    this.event = new GDGBaguioEvent();
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