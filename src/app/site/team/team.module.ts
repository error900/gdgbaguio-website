import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';

import { TeamComponent } from './team.component';
import { CreateUserComponent } from '../../user/create-user/create-user.component';
import { DetailsComponent } from '../../user/details/details.component';
import { ListUserComponent } from '../../user/list-user/list-user.component';

@NgModule({
  declarations: [
    TeamComponent,
    CreateUserComponent,
    DetailsComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    TeamComponent
  ]
})
export class TeamModule { }
