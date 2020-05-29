import { Component, OnInit } from '@angular/core';
import { MeetupService } from 'src/app/core/services/meetup.service';
import { eventInfo, FirebaseEvent } from '../../../core/model/events.model';
import { ActivatedRoute } from '@angular/router';
import { FirestoreEventsService } from 'src/app/core/services/firestore-events.service';

@Component({
  selector: 'site-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  eventDetails: eventInfo;
  firestoreEventDetails: any;
  firestoreEventHosts: any;
  eventid: string;

  showRegisterButton = false;
  showWaitlistButton = false;

  constructor(private meetupService: MeetupService, private firestoreService: FirestoreEventsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventid = this.route.snapshot.params.eventId;
    // this.getGDGEventDetails(this.eventid); // meetup api
    this.getFirestoreMeetupEvents(this.eventid); // get meetup events from firestore
    this.getFirestoreMeetupEventHosts(this.eventid); // get meetup event hosts from firestore
  }

  getFirestoreMeetupEvents(event_id: string) {
    this.firestoreService.getFirestoreEventDetails(event_id).get()
      .subscribe(
        firestoreEventDetails => {
          this.firestoreEventDetails = firestoreEventDetails.data();
          // (this.firestoreEventDetails.rsvp_limit <= this.firestoreEventDetails.yes_rsvp_count) ? this.showRegisterButton = true : this.showWaitlistButton = true;
          (this.firestoreEventDetails.rsvp_limit < this.firestoreEventDetails.yes_rsvp_count || (this.firestoreEventDetails.rsvp_limit == 0 && this.firestoreEventDetails.yes_rsvp_count == 0))
            ? this.showRegisterButton = true :
            ((this.firestoreEventDetails.rsvp_limit == this.firestoreEventDetails.yes_rsvp_count && !(this.firestoreEventDetails.rsvp_limit == 0 && this.firestoreEventDetails.yes_rsvp_count == 0))
              ? this.showWaitlistButton = true : console.log('none'));
          // (condition) ? (true block) : ((condition2) ? (true block2) : (else block2))
          console.log('this.firestoreEventDetails', firestoreEventDetails.data());
        }
      );
  }

  getFirestoreMeetupEventHosts(event_id: string) {
    this.firestoreService.getFirestoreEventHosts(event_id).get()
      .subscribe(
        firestoreEventHosts => {
          this.firestoreEventHosts = firestoreEventHosts.data();
          console.log('this.firestoreEventDetails', firestoreEventHosts.data());
        }
      );
  }

  getGDGEventDetails(event_id: string): void {
    this.meetupService.siteMeetupEventDetails(event_id)
      .subscribe(
        eventDetails => (
          this.eventDetails = eventDetails,
          (this.eventDetails.rsvp_limit <= this.eventDetails.yes_rsvp_count) ? this.showRegisterButton = true : this.showWaitlistButton = true,
          console.log(this.eventDetails)

        )
      );
  }

}
