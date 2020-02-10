import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ongoing-event-card',
  templateUrl: './ongoing-event.component.html',
  styleUrls: ['./ongoing-event.component.scss']
})
export class OngoingEventComponent implements OnInit {
  ongoingEvent_count = 0;
  constructor() { }

  ngOnInit() {
  }

}
