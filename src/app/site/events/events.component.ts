import { Component, OnInit } from '@angular/core';

import { MeetupService } from '../../core/services/meetup.service';
import { sitePastMeetupEvents, dashboardDraftMeetupEvents, siteRecentMeetupEvents } from '../../core/model/events.model';
import { meetupApiURL } from 'src/app/core/config/meetup-api-url';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [MeetupService]
})
export class EventsComponent implements OnInit {
  pastEvents: sitePastMeetupEvents[];
  draftEvents: dashboardDraftMeetupEvents[];
  recentEvents: siteRecentMeetupEvents[];
  pastEvents_count = 0;
  upcomingEvents_count = 0;
  recentEvents_count = 0;

  constructor(private meetupService: MeetupService) { }

  ngOnInit() {
    this.getPastGDGEvents();
    this.getDratGDGEvents();
    console.log(meetupApiURL.eventDraft);

  }

  getDratGDGEvents(): void {
    this.meetupService.dashboardDraftMeetupEvents()
      .subscribe(
        draftEvents => (
          this.draftEvents = draftEvents,
          this.upcomingEvents_count = this.draftEvents.length
          // console.log(this.pastEvents)
        )
      );
  }

  getRecentGDGEvents(): void {
    this.meetupService.siteRecentMeetupEvents()
    .subscribe(
      recentEvents => {
        this.recentEvents = recentEvents,
        this.recentEvents_count = recentEvents.length,
        console.log(this.recentEvents)
        
      }
    )
  }

  getPastGDGEvents(): void {
    let venue = {
      slu: {
        name: 'Saint Louis University',
        address_1: 'Mary Heights, Bakakeng, Baguio City'
      },
      uc: {
        name: 'University of the Cordilleras',
        address_1: 'University of the Cordilleras, Baguio City'
      },
      ub: {
        name: 'University of Baguio',
        address_1: 'University of Baguio, Baguio City'
      },
      bsu: {
        name: 'Benguet State University',
        address_1: 'La Trinidad, Benguet'
      }
    }

    this.meetupService.sitePastMeetupEvents()
      .subscribe(
        pastEvents => (
          this.pastEvents = pastEvents,
          this.pastEvents_count = this.pastEvents.length,
          // FIX events with NO locations
          this.pastEvents.reverse(),
          this.pastEvents[0].venue = venue.uc,
          this.pastEvents[3].venue = venue.ub,
          this.pastEvents[5].venue = venue.bsu,
          this.pastEvents[7].venue = venue.slu,
          this.pastEvents[8].venue = venue.slu,
          this.pastEvents.reverse()
          // console.log(this.pastEvents)
        )
      );
  }




}
