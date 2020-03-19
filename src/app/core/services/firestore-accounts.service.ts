import { Injectable } from '@angular/core';
import { User } from 'src/app/core/model/user.model'
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreAccountsService {
  private adminAccountsCollectionPath = '/admin-accounts';
  adminRef: AngularFirestoreCollection<User> = null;

  constructor(private db: AngularFirestore) {
    this.adminRef = db.collection(this.adminAccountsCollectionPath);

  }

  getAdminUser(uid: string): AngularFirestoreDocument<User> {
    return this.adminRef.doc<User>(uid);
  }
}
