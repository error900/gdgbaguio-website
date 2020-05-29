import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { LoginModule } from '../admin/login/login.module';
import { EventsMainModule } from '../admin/dashboard/events/events-main.module';
import { AttendanceMainModule } from '../admin/dashboard/attendance/attendance-main.module';
import { HomeModule } from './home.module';
import { CommunityModule } from './community/community.module';
import { EventsModule } from './events/events.module';
import { EventDetailsModule } from './events/event-details/event-details.module';
import { TeamModule } from './team/team.module';
import { Covid19Module } from './covid19/covid19.module';
import { ApplicationFormModule } from './application-form/application-form.module';
import { ApplicationSubmitModule } from './application-form/application-submit/application-submit.module';
import { Error400Module } from './error404/error400.module';

import { SiteComponent } from './site.component';

@NgModule({
  declarations: [
    SiteComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LoginModule,
    EventsMainModule,
    AttendanceMainModule,
    HomeModule,
    CommunityModule,
    EventsModule,
    EventDetailsModule,
    TeamModule,
    Covid19Module,
    ApplicationFormModule,
    ApplicationSubmitModule,
    Error400Module
  ],
  exports: [
    SiteComponent
  ]
})
export class SiteModule { }
