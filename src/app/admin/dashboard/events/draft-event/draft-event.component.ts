import { Component, OnInit } from '@angular/core';

import { dashboardDraftMeetupEvents } from 'src/app/core/model/events.model';
import { MeetupService } from 'src/app/core/services/meetup.service';
import { MDCRipple } from '@material/ripple';
import { MDCDialog } from '@material/dialog';
import { MDCList } from '@material/list';


@Component({
  selector: 'draft-event-card',
  templateUrl: './draft-event.component.html',
  styleUrls: ['./draft-event.component.scss']
})
export class DraftEventComponent implements OnInit {
  draftEvents: dashboardDraftMeetupEvents[];
  draftEvents_count = 0;

  constructor(private meetupService: MeetupService) { }

  ngOnInit() {
    this.getDratGDGEvents();
    console.log(this.draftEvents);

    const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
    const list = new MDCList(document.querySelector('.mdc-dialog .mdc-list'));

    dialog.listen('MDCDialog:opened', () => {
      list.layout();
    });
  }

  getDratGDGEvents(): void {
    this.meetupService.dashboardDraftMeetupEvents()
      .subscribe(
        draftEvents => (
          this.draftEvents = draftEvents,
          this.draftEvents_count = this.draftEvents.length
        )
      );
  }

}
