import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'application-submit',
  templateUrl: './application-submit.component.html',
  styleUrls: ['./application-submit.component.scss']
})
export class ApplicationSubmitComponent implements OnInit {
  application_type: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.application_type = this.route.snapshot.params.type;
  }

}
