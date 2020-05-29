import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AppRoutingModule } from '../../../app-routing.module';

import { MDCRipple } from '@material/ripple';

import { EventsDashboardComponent } from './events-main.component';
import { DashboardDrawerModule } from '../../common-components/dashboard-drawer/dashboard-drawer.module';

@NgModule({
  declarations: [
    EventsDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardDrawerModule
  ],
  exports: [
    EventsDashboardComponent
  ]
})
export class EventsMainModule {
  ripple() {
    const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action, .mdc-list-item';
    const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
      return new MDCRipple(el);
    });
  }
}
