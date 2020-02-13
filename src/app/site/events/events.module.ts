import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { TopBarModule } from '../../common-components/top-bar/top-bar.module';
import { EventsComponent } from './events.component';

@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TopBarModule
  ],
  exports: [
    EventsComponent
  ]
})
export class EventsModule { }
