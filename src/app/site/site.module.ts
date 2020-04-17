import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { LoginModule } from '../admin/login/login.module';
import { MeetupDashboardModule } from '../admin/dashboard/events/main.module';
import { HomeModule } from './home.module';
import { CommunityModule } from './community/community.module';
import { EventsModule } from './events/events.module';
import { EventDetailsModule } from './events/event-details/event-details.module';
import { TeamModule } from './team/team.module';
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
    MeetupDashboardModule,
    HomeModule,
    CommunityModule,
    EventsModule,
    EventDetailsModule,
    TeamModule,
    ApplicationFormModule,
    ApplicationSubmitModule,
    Error400Module
  ],
  exports: [
    SiteComponent
  ]
})
export class SiteModule { }
