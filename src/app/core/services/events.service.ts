import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { GDGBaguioEvents } from 'src/app/core/model/events.model'

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private collectionEventsPath = '/events';
  eventRef: AngularFirestoreCollection<GDGBaguioEvents> = null;
  
  constructor(private db: AngularFirestore) {
    this.eventRef = db.collection(this.collectionEventsPath);
  }

  createEvent(event: GDGBaguioEvents): void {
    this.eventRef.add({...event});
  }

  getEvents(): AngularFirestoreCollection<GDGBaguioEvents> {
    return this.eventRef;
  }

  deleteEvent(key: string): Promise<void> {
    return this.eventRef.doc(key).delete();
  }
}
