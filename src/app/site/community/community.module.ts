import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app-routing.module';
import { TopBarModule } from '../../common-components/top-bar/top-bar.module';
import { CommunityComponent } from './community.component';

@NgModule({
  declarations: [
    CommunityComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TopBarModule
  ],
  exports: [
    CommunityComponent
  ]
})
export class CommunityModule { }
