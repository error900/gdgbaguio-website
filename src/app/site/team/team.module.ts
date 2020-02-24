import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TopBarModule } from 'src/app/common-components/top-bar/top-bar.module';
import { TeamComponent } from './team.component';
import { CreateUserComponent } from '../../user/create-user/create-user.component';
import { DetailsComponent } from '../../user/details/details.component';
import { ListUserComponent } from '../../user/list-user/list-user.component';

@NgModule({
  declarations: [
    TeamComponent,
    CreateUserComponent,
    DetailsComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TopBarModule
  ],
  exports: [
    TeamComponent
  ]
})
export class TeamModule { }
