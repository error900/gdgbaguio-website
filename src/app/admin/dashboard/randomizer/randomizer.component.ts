import { Component, OnInit } from '@angular/core';

import { MeetupService } from 'src/app/core/services/meetup.service';
import { rsvpListItem } from 'src/app/core/model/events.model';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  eventid = 270862672;
  rsvplist: rsvpListItem[]

  constructor(private meetupService: MeetupService) { }

  ngOnInit(): void {
    this.getRSVPList(this.eventid);
  }

  getRSVPList(event_id: number) {
    this.meetupService.rsvpList(event_id)
      .subscribe(
        rsvplist => (
          this.rsvplist = rsvplist,
          console.log('rsvplistrsvplistrsvplist', this.rsvplist)

        )
      );
  }

}
