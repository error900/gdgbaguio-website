import { Component, OnInit } from '@angular/core';
import { MeetupService } from 'src/app/core/services/meetup.service';
import { eventInfo, FirebaseEvent } from '../../../core/model/events.model';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'site-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  eventDetails: eventInfo;
  firestoreEventDetail: FirebaseEvent;
  eventid: string;
  showRegisterButton = false;
  showWaitlistButton = false;

  constructor(private meetupService: MeetupService, private firestoreService: FirestoreService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventid = this.route.snapshot.params.eventId;
    this.getGDGEventDetails(this.eventid); // meetup api
    // this.getFirestoreMeetupEvents(this.eventid); // get meetup events from firestore
  }

  getFirestoreMeetupEvents(event_id: string) {
    this.firestoreService.getFirestoreEventsDetails(event_id).snapshotChanges().pipe(
      map(changes =>
        changes.map(
          c => ({
            key: c.payload.doc.id, ...c.payload.doc.data()
          })
        )
      )
    ).subscribe(
      firestoreEventDetail => {
        // this.firestoreEventDetail = firestoreEventDetail
      }
    );
  }

  getGDGEventDetails(event_id: string): void {
    this.meetupService.siteMeetupEventDetails(event_id)
      .subscribe(
        eventDetails => (
          this.eventDetails = eventDetails,
          (this.eventDetails.rsvp_limit >= this.eventDetails.yes_rsvp_count) ? this.showRegisterButton = true : this.showWaitlistButton = true,
          console.log(this.eventDetails)
          
        )
      );
  }

}
