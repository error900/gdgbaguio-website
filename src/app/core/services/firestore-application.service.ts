import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirebaseGoogleTech } from '../model/events.model';
import { GroupForm, SpeakerRequestForm } from '../model/application-form.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreApplicationService {
  private googleTechCollectionPath = '/google-technologies';
  private groupFormCollectionPath = '/group-applications';
  private requestSpeakerFormCollectionPath = '/speaker-request';
  techRef: AngularFirestoreCollection<FirebaseGoogleTech> = null;
  groupFormRef: AngularFirestoreCollection<GroupForm> = null;
  speakerRequestRef: AngularFirestoreCollection<SpeakerRequestForm> = null;

  constructor(private db: AngularFirestore) {
    this.techRef = db.collection(this.googleTechCollectionPath);
    this.groupFormRef = db.collection(this.groupFormCollectionPath);
    this.speakerRequestRef = db.collection(this.requestSpeakerFormCollectionPath);
  }

  createGroupApplication(form: GroupForm): void {
    this.groupFormRef.add({ ...form });
  }

  createSpeakerRequestApplication(form: SpeakerRequestForm): void {
    this.speakerRequestRef.add({ ...form });
  }

  getFirestoreGoogleTechs(): AngularFirestoreCollection<FirebaseGoogleTech> {
    return this.techRef;
  }
}
