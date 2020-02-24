import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../../app-routing.module';

import { MDCRipple } from '@material/ripple';

import { DashboardTopBarComponent } from '../../common-components/dashboard-top-bar/dashboard-top-bar.component';
import { DashboardDrawerComponent } from '../../common-components/dashboard-drawer/dashboard-drawer.component';
import { EventsDashboardComponent } from './main.component';
import { AttendanceDashboardComponent } from '../attendance/main.component';

@NgModule({
  declarations: [
    DashboardTopBarComponent,
    DashboardDrawerComponent,
    EventsDashboardComponent,
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
