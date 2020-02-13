import { Component, OnInit } from '@angular/core';

import { MeetupService } from '../../core/services/meetup.service';
import { siteOngoingUpcomingMeetupEvent, siteRecentMeetupEvent, sitePastMeetupEvent } from '../../core/model/events.model';
import { meetupApiURL } from 'src/app/core/config/meetup-api-url';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [MeetupService]
})
export class EventsComponent implements OnInit {
  ongoingAndUpcomingEvents: siteOngoingUpcomingMeetupEvent[];
  recentEvents: siteRecentMeetupEvent[];
  pastEvents: sitePastMeetupEvent[];
  ongoingAndUpcmingEvents_count = 0;
  recentEvents_count = 0;
  pastEvents_count = 0;

  constructor(private meetupService: MeetupService) { }

  ngOnInit() {
    this.getOngoingAndUpcomingGDGEvents();
    this.getRecentGDGEvents();
    this.getPastGDGEvents();
    // this.getDratGDGEvents();
    console.log('api_url');
  }

  getOngoingAndUpcomingGDGEvents(): void {
    this.meetupService.siteOngoingAndUpcomingMeetupEvents()
      .subscribe(
        ongoingAndUpcmingEvents => (
          this.ongoingAndUpcomingEvents = ongoingAndUpcmingEvents,
          this.ongoingAndUpcmingEvents_count = ongoingAndUpcmingEvents.length,
          console.log(this.ongoingAndUpcomingEvents)
        )
      );
  }

  getRecentGDGEvents(): void {
    this.meetupService.siteRecentMeetupEvents()
      .subscribe(
        recentEvents => {
          this.recentEvents = recentEvents,
            this.recentEvents_count = recentEvents.length
        }
      );
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

  // getDratGDGEvents(): void {
  //   this.meetupService.dashboardDraftMeetupEvents()
  //     .subscribe(
  //       draftEvents => (
  //         this.draftEvents = draftEvents,
  //         this.upcomingEvents_count = this.draftEvents.length
  //         // console.log(this.pastEvents)
  //       )
  //     );
  // }

}
