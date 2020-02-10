import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { User } from 'src/app/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collectionUsersPath = '/users';
  userRef: AngularFirestoreCollection<User> = null;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.collectionUsersPath);
  }

  createUser(user: User): void {
    this.userRef.add({...user});
  }

  getUsers(): AngularFirestoreCollection<User> {
    return this.userRef;
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.userRef.doc(key).update(value);
  }

  deleteUser(key: string): Promise<void> {
    return this.userRef.doc(key).delete();
  }

  deleteAllUsers() {
    this.userRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('ERROR:', error);
      }
    );
  }
}
