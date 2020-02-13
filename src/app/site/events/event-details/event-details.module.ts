import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarModule } from 'src/app/common-components/top-bar/top-bar.module';
import { EventDetailsComponent } from './event-details.component';

@NgModule({
  declarations: [
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    TopBarModule
  ],
  exports: [
    EventDetailsComponent
  ]
})
export class EventDetailsModule { }
