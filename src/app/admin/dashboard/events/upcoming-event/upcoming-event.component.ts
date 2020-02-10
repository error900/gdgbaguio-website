import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'upcoming-event-card',
  templateUrl: './upcoming-event.component.html',
  styleUrls: ['./upcoming-event.component.scss']
})
export class UpcomingComponent implements OnInit {
  upcomingEvents_count = 0;

  constructor() { }

  ngOnInit() {
  }

}
