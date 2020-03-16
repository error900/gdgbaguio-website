import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseEvent, FirebaseEventHost, FirebaseGoogleTech } from '../model/events.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private eventsCollectionPath = '/events';
  private hostsCollectionPath = '/hosts';
  private googleTechCollectionPath = '/google-technologies';
  private adminAccountsCollectionPath = '/admin-accounts';
  eventRef: AngularFirestoreCollection<FirebaseEvent> = null;
  hostRef: AngularFirestoreCollection<FirebaseEventHost> = null;
  techRef: AngularFirestoreCollection<FirebaseGoogleTech> = null;
  adminRef: AngularFirestoreCollection<User> = null;

  constructor(private db: AngularFirestore) {
    this.eventRef = db.collection(this.eventsCollectionPath);
    this.hostRef = db.collection(this.hostsCollectionPath);
    this.techRef = db.collection(this.googleTechCollectionPath);
    this.adminRef = db.collection(this.adminAccountsCollectionPath);
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

  getFirestoreEventDetails(event_id: string): AngularFirestoreDocument<FirebaseEvent> {
    return this.eventRef.doc(event_id);
  }

  getFirestoreEventHosts(event_id: string): AngularFirestoreDocument<FirebaseEventHost> {
    return this.hostRef.doc(event_id);
  }

  getFirestoreGoogleTechs(): AngularFirestoreCollection<FirebaseGoogleTech> {
    return this.techRef;
  }

  getAdminUser(uid: string): AngularFirestoreDocument<User> {
    return this.adminRef.doc<User>(uid);
  }
}
