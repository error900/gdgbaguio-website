import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app-routing.module';
import { Error404Component } from './error404.component';

@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    Error404Component
  ]
})
export class Error400Module { }
