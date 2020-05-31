import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './site/home.component';
import { CommunityComponent } from './site/community/community.component';
import { EventsComponent } from './site/events/events.component';
import { EventDetailsComponent } from './site/events/event-details/event-details.component';
import { TeamComponent } from './site/team/team.component';
import { Covid19Component } from './site/covid19/covid19.component';
import { ApplicationFormComponent } from './site/application-form/application-form.component';
import { ApplicationSubmitComponent } from './site/application-form/application-submit/application-submit.component';
import { Error404Component } from './site/error404/error404.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminCheckComponent } from './admin/common-components/admin-check/admin-check.component';
import { EventsDashboardComponent } from './admin/dashboard/events/events-main.component';
import { AttendanceDashboardComponent } from './admin/dashboard/attendance/attendance-main.component';

import { ListUserComponent } from './user/list-user/list-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { AuthenticationGuard } from './core/guard/authentication.guard';

import { RandomizerComponent } from './admin/dashboard/randomizer/randomizer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:eventId', component: EventDetailsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'covid-19', component: Covid19Component },
  { path: 'application/:type', component: ApplicationFormComponent },
  { path: 'application-submit/:type', component: ApplicationSubmitComponent },
  { path: 'dashboard/users', component: ListUserComponent },
  { path: 'dashboard/adduser', component: CreateUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin-check/:access_status', component: AdminCheckComponent, canActivate: [AuthenticationGuard] },
  // { path: 'dashboard/meetup-events', component: EventsDashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard/meetup-events', component: EventsDashboardComponent },
  { path: 'dashboard/meetup-attendance', component: AttendanceDashboardComponent },

  { path: 'randomizer/sSvUWUPZ3gbPxP8X52tDFZk18165jSAEyE5MrWJQrJ9IWL1CXIOpkp2l2KFZI7p2yYgPjmdXx9gd15sZ5kfyhDvmALUEvf3bzVqJUFn3KhhYsmCZ89XRswDTktfmb8RK', component: RandomizerComponent },

  // otherwise redirect to 404 page /
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
