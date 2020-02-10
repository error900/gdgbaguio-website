import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app-routing.module';
import { TopBarModule } from '../../common-components/top-bar/top-bar.module';
import { Error404Component } from './error404.component';

@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TopBarModule
  ],
  exports: [
    Error404Component
  ]
})
export class Error400Module { }
