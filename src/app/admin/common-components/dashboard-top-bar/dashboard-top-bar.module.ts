import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardTopBarComponent } from './dashboard-top-bar.component';

@NgModule({
    declarations: [
        DashboardTopBarComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        DashboardTopBarComponent
    ]
})
export class DashboardTopBarModule { }