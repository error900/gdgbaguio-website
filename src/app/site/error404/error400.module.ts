import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import { TopBarModule } from 'src/app/common-components/top-bar/top-bar.module';
import { Error404Component } from './error404.component';

@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule,
    RouterModule
    // ,
    // TopBarModule
  ],
  exports: [
    Error404Component
  ]
})
export class Error400Module { }
