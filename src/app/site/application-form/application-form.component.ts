import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { map } from 'rxjs/operators';
import { FirebaseGoogleTechInterface } from 'src/app/core/model/events.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  application_type: string;
  wtm_logo = '../../assets/images/wtm-logo-horiz-rgb.svg';
  wtm = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/wtm.png';
  google_techs: FirebaseGoogleTechInterface[];

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.application_type = this.route.snapshot.params.type;
  }

  ngAfterViewInit() {
    if (this.application_type == 'sponsor' || this.application_type == 'wtm' || this.application_type == 'volunteer') {
      const i = <HTMLInputElement>document.getElementById('applicantion-type');
      console.log('i', i);

      i.value = this.application_type;
    } else {
      console.log('this.getGoogleTechs();', this.getGoogleTechs());
      console.log('APPLICATION FORM');
    }

  }

  getGoogleTechs() {
    this.firestoreService.getFirestoreGoogleTechs().snapshotChanges().pipe(
      map(changes =>
        changes.map(
          c => ({
            key: c.payload.doc.id, ...c.payload.doc.data()
          })
        )
      )
    ).subscribe(
      google_techs => {
        this.google_techs = google_techs;
        console.log('google_techs', this.google_techs);

      }
    )
  }

  applicationFormValidation() {
    const greetMessageEl = document.querySelector('.greet-message');
    const greetButton = document.querySelector('.greet-button');
    greetButton.addEventListener('click', () => {
      const firstNameInput = (<HTMLInputElement>document.querySelector('.first-name-input')).value;
      const lastNameInput = (<HTMLInputElement>document.querySelector('.last-name-input')).value;
      let name;
      if (firstNameInput || lastNameInput) {
        name = firstNameInput + ' ' + lastNameInput;
      } else {
        name = 'Anonymous';
      }
      greetMessageEl.textContent = `Hello, ${name}!`;
    });
  }

}