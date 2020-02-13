import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { GDGBaguioEvent } from 'src/app/core/model/events.model'

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private collectionEventsPath = '/events';
  eventRef: AngularFirestoreCollection<GDGBaguioEvent> = null;
  
  constructor(private db: AngularFirestore) {
    this.eventRef = db.collection(this.collectionEventsPath);
  }

  createEvent(event: GDGBaguioEvent): void {
    this.eventRef.add({...event});
  }

  getEvents(): AngularFirestoreCollection<GDGBaguioEvent> {
    return this.eventRef;
  }

  deleteEvent(key: string): Promise<void> {
    return this.eventRef.doc(key).delete();
  }
}
