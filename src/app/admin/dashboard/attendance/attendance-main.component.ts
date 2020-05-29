import { Component, OnInit } from '@angular/core';
import { MeetupService } from 'src/app/core/services/meetup.service';
import { eventRSVP } from 'src/app/core/model/events.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'meetup-attendance-dashboard',
  templateUrl: './attendance-main.component.html',
  styleUrls: ['./attendance-main.component.scss']
})
export class AttendanceDashboardComponent implements OnInit {
  rsvps: eventRSVP[];
  eventid = '270862672';
  rsvp_count = 0;

  constructor(private meetupService: MeetupService) { }

  ngOnInit() {
    this.getMeetupRSVP(this.eventid);
  }

  getMeetupRSVP(event_id: string) {
    this.meetupService.meetupRSVP(event_id)
      .subscribe(
        rsvps => (
          this.rsvps = rsvps,
          this.rsvp_count = this.rsvps.length,
          this.rsvps = this.addPhotoPlaceholder(this.rsvps),
          console.log(this.rsvps)
        )
      );
  }

  addPhotoPlaceholder(arr: eventRSVP[]) {
    var obj = {} as eventRSVP;
    let rsvps = [];
    let photo_link_placeholder = {
      photo_link: 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/account-photo/van.jpg'
    }
    for (let index = 0; index < arr.length; index++) {
      obj = arr[index];
      if (!obj.member.hasOwnProperty('photo')) {
        obj.member.photo = photo_link_placeholder
      }
      rsvps.push(obj);
    }
    return rsvps;
  }

}
