import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarModule } from 'src/app/common-components/top-bar/top-bar.module';
import { EventsComponent } from './events.component';

@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    TopBarModule
  ],
  exports: [
    EventsComponent
  ]
})
export class EventsModule { }
