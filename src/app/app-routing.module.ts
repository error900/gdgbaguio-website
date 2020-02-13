import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './site/home.component';
import { CommunityComponent } from './site/community/community.component';
import { EventsComponent } from './site/events/events.component';
import { EventDetailsComponent } from './site/events/event-details/event-details.component';
import { TeamComponent } from './site/team/team.component';
import { Error404Component } from './site/error404/error404.component';
import { LoginComponent } from './admin/login/login.component';
import { EventsDashboardComponent } from './admin/dashboard/events/main.component';
import { AttendanceDashboardComponent } from './admin/dashboard/attendance/main.component';

import { ListUserComponent } from './user/list-user/list-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';

import { AuthenticationGuard } from './core/guard/authentication.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:eventId', component: EventDetailsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'dashboard/users', component: ListUserComponent },
  { path: 'dashboard/adduser', component: CreateUserComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard] },
  { path: 'meetup-events', component: EventsDashboardComponent },
  { path: 'meetup-attendance', component: AttendanceDashboardComponent },

  // otherwise redirect to 404 page /
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
