import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { FirebaseEvent } from 'src/app/core/model/events.model'

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private collectionEventsPath = '/events';
  eventRef: AngularFirestoreCollection<FirebaseEvent> = null;

  constructor(private db: AngularFirestore) {
    this.eventRef = db.collection(this.collectionEventsPath);
  }

  mergeMeetupEventsToFirestore(event: FirebaseEvent): void {
    // this.eventRef.add({ ...event });
    this.eventRef.doc<FirebaseEvent>('meetup-' + event.id).set(
      event,
      { merge: true }
    );
  }

  createEvent(e: any) {

  }

  deleteEvent(key: string): Promise<void> {
    return this.eventRef.doc(key).delete();
  }
}
