import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../../app-routing.module';

import { MDCRipple } from '@material/ripple';

import { DashboardTopBarComponent } from '../../common-components/dashboard-top-bar/dashboard-top-bar.component';
import { DashboardDrawerComponent } from '../../common-components/dashboard-drawer/dashboard-drawer.component';
import { EventsDashboardComponent } from './main.component';
import { OngoingEventComponent } from './ongoing-event/onging-event.component';
import { UpcomingComponent } from './upcoming-event/upcoming-event.component';
import { DraftEventComponent } from './draft-event/draft-event.component';
import { AttendanceDashboardComponent } from '../attendance/main.component';

@NgModule({
  declarations: [
    DashboardTopBarComponent,
    DashboardDrawerComponent,
    EventsDashboardComponent,
    OngoingEventComponent,
    UpcomingComponent,
    DraftEventComponent,
    AttendanceDashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    DashboardTopBarComponent,
    DashboardDrawerComponent,
    EventsDashboardComponent,
    OngoingEventComponent,
    UpcomingComponent,
    DraftEventComponent,
    AttendanceDashboardComponent
  ]
})
export class MeetupDashboardModule {
  ripple() {
    const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action, .mdc-list-item';
    const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
      return new MDCRipple(el);
    });
  }
}
