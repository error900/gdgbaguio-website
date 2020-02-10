import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Environment
import { environment } from 'src/environments/environment';
// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { httpInterceptorProviders } from 'src/app/http-interceptors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule, // FIREBASE/databse
    AngularFirestoreModule, // FIREBASE/firestore, only needed for database features
    AngularFireAuthModule, // FIREBASE/auth, only needed for auth features,
    // AngularFireStorageModule, // FIREBASE/storage only needed for storage features
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {}},
    httpInterceptorProviders
  ]
})
export class ConfigModule { }
