import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FirebaseGoogleTechInterface } from 'src/app/core/model/events.model';
import { FirestoreApplicationService } from 'src/app/core/services/firestore-application.service';
import { GroupForm, SpeakerRequestForm } from 'src/app/core/model/application-form.model';

import { MDCCheckbox } from '@material/checkbox';
import { MDCFormField } from '@material/form-field';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  groupForm = {} as GroupForm;
  application_type: string;
  full_name;
  company_school;
  position_profession;
  mobile_number;
  email;
  message;
  speakerRequestForm = {} as SpeakerRequestForm;
  sr_email;
  sr_event_name;
  sr_event_location;
  sr_event_description;
  sr_target_audience;
  sr_target_number;

  google_techs: FirebaseGoogleTechInterface[];

  wtm_logo = '../../assets/images/wtm-logo-horiz-rgb.svg';
  wtm = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/wtm.png';

  constructor(private firestoreApplicationService: FirestoreApplicationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.application_type = this.route.snapshot.params.type;
    console.log('this.application_type', this.application_type);
    if (this.application_type == 'speaker') {
      this.getGoogleTechs();
    }
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
      this.full_name = <HTMLInputElement>document.getElementById('applicant-full-name');
      this.company_school = <HTMLInputElement>document.getElementById('applicant-company-school');
      this.position_profession = <HTMLInputElement>document.getElementById('applicant-position-profession');
      this.mobile_number = <HTMLInputElement>document.getElementById('applicant-mobile-number');
      this.email = <HTMLInputElement>document.getElementById('applicant-email');
      this.message = <HTMLTextAreaElement>document.getElementById('applicant-message');

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
      console.log('sr_application_type_input.value', sr_application_type_input.value);
      
      this.sr_email = <HTMLInputElement>document.getElementById('applicant-full-name');
      this.sr_event_name = <HTMLInputElement>document.getElementById('applicant-company-school');
      this.sr_event_location = <HTMLInputElement>document.getElementById('applicant-position-profession');
      this.sr_event_description = <HTMLTextAreaElement>document.getElementById('applicant-email');
      this.sr_target_audience = <HTMLInputElement>document.getElementById('applicant-message');
      this.sr_target_number = <HTMLInputElement>document.getElementById('applicant-mobile-number');

      const inputFieldSelector = '#request-application-form .text-field-container .mdc-text-field input';
      const textareaSelector = '#request-application-form .text-field-container .mdc-text-field textarea';

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
                  request_speaker_submit.setAttribute('disabled', 'disabled');
                } else {
                  request_speaker_submit.removeAttribute('disabled')
                }
              });
            });
          });
        });
      });
    }
  }

  saveGroupApplication(type) {
    this.groupForm.type = type.toUpperCase();
    this.groupForm.fullName = this.full_name.value.toUpperCase();
    this.groupForm.companyORschool = this.company_school.value.toUpperCase();
    this.groupForm.positionORprofession = this.position_profession.value.toUpperCase();
    this.groupForm.mobileNumber = Number(this.mobile_number.value);
    this.groupForm.email = this.email.value.toUpperCase();
    this.groupForm.message = this.message.value.toUpperCase();

    this.firestoreApplicationService.createGroupApplication(this.groupForm);
  }

  saveSpeakerRequestApplication(type) {
    this.speakerRequestForm.type = type.toUpperCase();
    this.speakerRequestForm.email = this.sr_email.toUpperCase();
    this.speakerRequestForm.eventName = this.sr_event_name.toUpperCase();
    this.speakerRequestForm.eventLocation = this.sr_event_location.toUpperCase();
    this.speakerRequestForm.eventDescription = this.sr_event_description.toUpperCase();
    this.speakerRequestForm.targetAudience = this.sr_target_audience.toUpperCase();
    this.speakerRequestForm.targetNumber = Number(this.sr_target_number);

    this.firestoreApplicationService.createSpeakerRequestApplication(this.speakerRequestForm);
  }

  onSubmit(type) {
    if (type == "wtm" || type == "volunteer" || type == "sponsor") {
      try {
        this.saveGroupApplication(type);
        this.router.navigate(['/application-submit', type]);
      } catch (error) {
        this.router.navigate(['/application-submit', 'error']);
      }
    } else if (type == "speaker") {
      try {
        this.saveSpeakerRequestApplication(type);
        this.router.navigate(['/application-submit', type]);
      } catch (error) {
        this.router.navigate(['/application-submit', 'error']);
      }
    }

  }

}