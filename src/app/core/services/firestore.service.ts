import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseEvent, FirebaseEventHost } from '../model/events.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private eventsCollectionPath = '/events';
  private hostsCollectionPath = '/hosts';
  eventRef: AngularFirestoreCollection<FirebaseEvent> = null;
  hostRef: AngularFirestoreCollection<FirebaseEventHost> = null;

  constructor(private db: AngularFirestore) {
    this.eventRef = db.collection(this.eventsCollectionPath);
    this.hostRef = db.collection(this.hostsCollectionPath);
  }

  mergeMeetupEventsToFirestore(event: FirebaseEvent): void {
    // this.eventRef.add({ ...event });
    this.eventRef.doc<FirebaseEvent>(event.id).set(
      event,
      { merge: true }
    );
  }

  mergeMeetupEventHostsToFirestore(hosts: FirebaseEventHost): void {
    this.hostRef.doc<FirebaseEventHost>(hosts.id).set(
      hosts,
      { merge: true }
    );
  }

  getFirestoreEvents(): AngularFirestoreCollection<FirebaseEvent> {
    return this.eventRef;
  }

  getFirestoreEventsDetails(event_id: string): AngularFirestoreDocument<FirebaseEvent> {
    return this.eventRef.doc(event_id);
  }
}
