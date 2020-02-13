import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './event-details.component';

@NgModule({
  declarations: [
    EventDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventDetailsComponent
  ]
})
export class EventDetailsModule { }
