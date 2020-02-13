import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { EventsComponent } from './events.component';

@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    EventsComponent
  ]
})
export class EventsModule { }
