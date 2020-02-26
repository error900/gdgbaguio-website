import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { FirebaseEvent, FirebaseEventDocument } from 'src/app/core/model/events.model'

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private collectionEventsPath = '/meetup-events';
  private collectionVenuePath = '/meetup-venue';
  private collectionFeaturedPHotoPath = '/meetup-event-photo';
  eventRef: AngularFirestoreCollection<FirebaseEventDocument> = null;
  // venueRef: AngularFirestoreCollection<FirebaseEvent> = null;
  // featuredPhotoRef: AngularFirestoreCollection<FirebaseEvent> = null;

  constructor(private db: AngularFirestore) {
    this.eventRef = db.collection(this.collectionEventsPath);
    // this.venueRef = db.collection(this.collectionVenuePath);
    // this.featuredPhotoRef = db.collection(this.collectionFeaturedPHotoPath);
  }

  createEvent(event: FirebaseEventDocument): void {
    // this.eventRef.add({ ...event });
    this.eventRef.doc<FirebaseEventDocument>(event.id).set(
      {
        id: event.id,
        name: event.name,
        rsvp_limit: event.rsvp_limit,
        status: event.status,
        local_date: event.local_date,
        waitlist_count: event.waitlist_count,
        yes_rsvp_count: event.yes_rsvp_count,
        link: event.link,
        manual_attendance_count: event.manual_attendance_count,
        description: event.description,

      },
      { merge: true }
    );

    // this.venueRef.add(
    //   {
    //     id: event.id,
    //     name: event.venue.name,
    //     city: event.venue.city
    //     // address_1: event.venue.address_1,

    //   }
    // );

    // this.featuredPhotoRef.add(
    //   featured_photo: {
    //     highres_link: event.highres_link,
    //   }
    // );

  }

  // getEvents(): AngularFirestoreCollection<FirebaseEvent> {
  //   return this.eventRef;
  // }

  deleteEvent(key: string): Promise<void> {
    return this.eventRef.doc(key).delete();
  }
}
