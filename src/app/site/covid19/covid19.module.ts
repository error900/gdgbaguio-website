import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Covid19Component } from './covid19.component';

@NgModule({
  declarations: [
    Covid19Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Covid19Component
  ]
})
export class Covid19Module { }
