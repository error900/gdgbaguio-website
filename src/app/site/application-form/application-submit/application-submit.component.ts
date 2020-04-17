import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'application-submit',
  templateUrl: './application-submit.component.html',
  styleUrls: ['./application-submit.component.scss']
})
export class ApplicationSubmitComponent implements OnInit {
  application_type: string;
  wtm_logo = '../../../assets/images/wtm-logo-horiz-rgb.svg';
  wtm = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/wtm.png';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.application_type = this.route.snapshot.params.type;
  }

}
