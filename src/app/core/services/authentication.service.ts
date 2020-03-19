import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { MeetupAuthService } from './meetup-auth.service';
import { FirestoreAccountsService } from './firestore-accounts.service';
import { User } from 'src/app/core/model/user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<User>;
  currentUser: User;
  adminUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private meetupOAuth: MeetupAuthService,
    private firestoreAccountsService: FirestoreAccountsService
  ) {
    // Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`google-accounts/${user.uid}`).get()
        } else {
          return of(null)
        }
      })
    );

    this.user$.subscribe(
      currentUser => {
        this.currentUser = currentUser
      }
    )
  }

  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

    return this.updateUserData(credential.user);
  }

  async adminUserGoogleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

    return this.updateAdminUserData(credential.user);
  }

  async signOut() {
    this.meetupOAuth.updateUserMeetupSignout(localStorage['uid']);
    localStorage.clear();
    this.meetupSignOut();
    await this.afAuth.auth.signOut();

    return this.router.navigate(['/']);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`google-accounts/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      admin: false,
      meetupSignin: false
    };

    localStorage.setItem('uid', user.uid);
    localStorage.setItem('photoURL', user.photoURL);

    return userRef.set(data, { merge: true });
  }

  private updateAdminUserData(user) {
    localStorage.setItem('uid', user.uid);
    localStorage.setItem('photoURL', user.photoURL);
    // Sets user data to firestore on login
    const adminRef: AngularFirestoreDocument<User> = this.afs.doc(`admin-accounts/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      admin: false,
      meetupSignin: false
    };

    adminRef.get().subscribe(
      adminUser => {
        if (adminUser.exists) {
          return (adminRef.update({ photoURL: user.photoURL }), this.checkAdminUser(user.uid));
        } else {
          localStorage.clear();
          return (adminRef.set(data, { merge: true }), this.router.navigate(['/signin-check', 'denied']));
        }
      }
    )
  }

  checkAdminUser(uid: string) {
    this.firestoreAccountsService.getAdminUser(uid).get().subscribe(
      adminUser => {
        this.adminUser = adminUser.data();

        if (this.adminUser.admin == true && this.adminUser.meetupSignin == true) {
          this.router.navigate(['/dashboard/meetup-events']);
        } else if (this.adminUser.admin == true && this.adminUser.meetupSignin == false) {
          // var done = this.meetupSignIn();
          // if (done) {
          this.meetupOAuth.getAuthorizationToken();
          // }
        } else {
          this.router.navigate(['/signin-check', 'denied']);
        }
      }
    )
  }

  meetupSignIn() {
    try {
      var width = 500,
        height = 350,
        top = (screen.height - height) / 2,
        left = (screen.width - width) / 2;
      var meetuploginWindow = window.open(
        "https://accounts.google.com/o/oauth2/auth?scope=email%20profile&redirect_uri=https://secure.meetup.com/ties/google/&response_type=code&state=returnUri%3Dhttps%253A%252F%252Fwww.meetup.com%252F&client_id=855636443875-pmqkjkrj33pvp0t1ghecgp4f3l746856.apps.googleusercontent.com&access_type=offline",
        "MEETUP",
        ["height=", height, ",width=", width,
          ",top=", top, ",left=", left].join('')
      );

      // var openedMeetuploginWindow = window.open('', 'MEETUP');
      var request = new Request(meetuploginWindow.location.href);
      fetch(request).then(function (response) {
        // console.log('response.status', response.status); // returns 200
        meetuploginWindow.alert('response.status' + response.status);
      });

      // // meetuploginWindow.window.focus();
      // meetuploginWindow.onload = () => {
      //   // setTimeout(function () {
      //   meetuploginWindow.close();
      //   // }, 3000);
      // }

      return true;
      // var openedMeetuploginWindow = window.open('', 'Meetup');
      // setTimeout(function () {
      //   openedMeetuploginWindow.close();
      // }, 3000);
    } catch (error) {
      return false;
    }
  }

  meetupSignOut() {
    try {
      var width = 500,
        height = 350,
        top = (screen.height - height) / 2,
        left = (screen.width - width) / 2;
      var meetuplogoutWindow = window.open(
        "https://www.meetup.com/logout/",
        "Meetup",
        ["height=", height, ",width=", width,
          ",top=", top, ",left=", left].join('')
      );
      meetuplogoutWindow.window.focus();
      setTimeout(function () {
        meetuplogoutWindow.close();
      }, 3000);
    } catch (error) {
    }
  }

}