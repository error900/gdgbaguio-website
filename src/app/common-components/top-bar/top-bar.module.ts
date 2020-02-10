import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { TopBarComponent } from './top-bar.component';

@NgModule({
  declarations: [
    TopBarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    TopBarComponent
  ]
})
export class TopBarModule { }
