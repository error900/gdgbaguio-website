import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';

import { LoginModule } from '../admin/login/login.module';
import { MeetupDashboardModule } from '../admin/dashboard/events/main.module';
import { CommunityModule } from './community/community.module';
import { EventsModule } from './events/events.module';
import { EventDetailsModule } from './events/event-details/event-details.module';
import { TeamModule } from './team/team.module';
import { Error400Module } from './error404/error400.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    LoginModule,
    MeetupDashboardModule,
    CommunityModule,
    EventsModule,
    EventDetailsModule,
    TeamModule,
    Error400Module
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
