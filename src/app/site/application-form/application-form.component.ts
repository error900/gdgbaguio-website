import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  application_type: string;
  wtm_logo = '../../assets/images/wtm-logo-horiz-rgb.svg';
  wtm = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/wtm.png';

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.application_type = this.route.snapshot.params.type;
    const i = <HTMLInputElement>document.querySelector('#applicantion-type');
    i.value = this.application_type;
  }
}