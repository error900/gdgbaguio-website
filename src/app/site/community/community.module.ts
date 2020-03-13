import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityComponent } from './community.component';
import { FooterModule } from 'src/app/common-components/footer/footer.module';


@NgModule({
  declarations: [
    CommunityComponent
  ],
  imports: [
    CommonModule,
    FooterModule
  ],
  exports: [
    CommunityComponent
  ]
})
export class CommunityModule { }