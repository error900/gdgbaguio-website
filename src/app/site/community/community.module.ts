import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarModule } from 'src/app/common-components/top-bar/top-bar.module';
import { CommunityComponent } from './community.component';

@NgModule({
  declarations: [
    CommunityComponent
  ],
  imports: [
    CommonModule,
    TopBarModule
  ],
  exports: [
    CommunityComponent
  ]
})
export class CommunityModule { }