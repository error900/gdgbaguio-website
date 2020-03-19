import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FirebaseGoogleTechInterface } from 'src/app/core/model/events.model';
import { FirestoreApplicationService } from 'src/app/core/services/firestore-application.service';
import { GroupForm, SpeakerRequestForm } from 'src/app/core/model/application-form.model';
import { StringifyOptions } from 'querystring';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  application_type: string;
  groupForm: GroupForm;
  speakerRequestForm: SpeakerRequestForm = new SpeakerRequestForm();
  google_techs: FirebaseGoogleTechInterface[];

  wtm_logo = '../../assets/images/wtm-logo-horiz-rgb.svg';
  wtm = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/wtm.png';

  constructor(private firestoreApplicationService: FirestoreApplicationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.application_type = this.route.snapshot.params.type;
    console.log('this.application_type', this.application_type);
  }

  ngAfterViewInit() {
    this.applicationFormValidation();
  }

  getGoogleTechs() {
    this.firestoreApplicationService.getFirestoreGoogleTechs().snapshotChanges().pipe(
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
    if (this.application_type == 'sponsor' || this.application_type == 'wtm' || this.application_type == 'volunteer') {
      const application_submit = <HTMLButtonElement>document.getElementById('application-submit-button');
      const application_type_input = <HTMLInputElement>document.getElementById('application-type');
      application_type_input.value = this.application_type;

      const inputFieldSelector = '#group-application-form .text-field-container .mdc-text-field input';
      const textareaSelector = '#group-application-form .text-field-container .mdc-text-field textarea';

      [document.querySelectorAll<HTMLInputElement>(inputFieldSelector), document.querySelectorAll<HTMLTextAreaElement>(textareaSelector)].forEach(list => {
        list.forEach(element => {
          element.addEventListener('keyup', event => {
            var empty = false;
            [document.querySelectorAll<HTMLInputElement>(inputFieldSelector), document.querySelectorAll<HTMLTextAreaElement>(textareaSelector)].forEach(list => {
              list.forEach(element => {
                console.log('element', element);
                if (element.value == '') {
                  empty = true;
                }
                if (empty) {
                  application_submit.setAttribute('disabled', 'disabled');
                } else {
                  application_submit.removeAttribute('disabled')
                }
              });
            });
          });
        });
      });

    } else if (this.application_type == 'speaker') {
      const sr_application_type_input = <HTMLInputElement>document.getElementById('sr-application-type');
      const request_speaker_submit = <HTMLButtonElement>document.getElementById('request-speaker-submit-button');

      sr_application_type_input.value = this.application_type;
      console.log('this.getGoogleTechs();', this.getGoogleTechs());
    }
  }

  saveGroupApplication() {
    const full_name = <HTMLInputElement>document.getElementById('applicant-full-name');
    const company_school = <HTMLInputElement>document.getElementById('applicant-company-school');
    const position_profession = <HTMLInputElement>document.getElementById('applicant-position-profession');
    const mobile_number = <HTMLInputElement>document.getElementById('applicant-mobile-number');
    const email = <HTMLInputElement>document.getElementById('applicant-email');
    const message = <HTMLTextAreaElement>document.getElementById('applicant-message');


    this.groupForm.type = this.application_type;
    this.groupForm.fullName = full_name.value;
    this.groupForm.companyORschool = company_school.value;
    this.groupForm.positionORprofession = position_profession.value;
    this.groupForm.mobileNumber = Number(mobile_number.value);
    this.groupForm.email = email.value;
    this.groupForm.message = message.value;

    this.firestoreApplicationService.createGroupApplication(this.groupForm);
  }

  saveSpeakerRequestApplication() {
    this.firestoreApplicationService.createSpeakerRequestApplication(this.speakerRequestForm);
  }

  onSubmit(type) {
    if (type == "wtm" || type == "volunteer" || type == "sponsor") {
      this.saveGroupApplication();
      this.router.navigate(['/application-submit', this.application_type]);
    } else if (type == "request") {
      this.saveSpeakerRequestApplication();
    }

  }

}