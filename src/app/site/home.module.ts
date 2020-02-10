import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';

import { TopBarModule } from '../common-components/top-bar/top-bar.module';
import { LoginModule } from '../admin/login/login.module';
import { MeetupDashboardModule } from '../admin/dashboard/events/main.module';
import { CommunityModule } from './community/community.module';
import { EventsModule } from './events/events.module';
import { TeamModule } from './team/team.module';
import { Error400Module } from './error404/error400.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    TopBarModule,
    LoginModule,
    MeetupDashboardModule,
    CommunityModule,
    EventsModule,
    TeamModule,
    Error400Module
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
