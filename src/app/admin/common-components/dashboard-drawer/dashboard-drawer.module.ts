import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardDrawerComponent } from './dashboard-drawer.component';

@NgModule({
    declarations: [
        DashboardDrawerComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        DashboardDrawerComponent
    ]
})
export class DashboardDrawerModule { }