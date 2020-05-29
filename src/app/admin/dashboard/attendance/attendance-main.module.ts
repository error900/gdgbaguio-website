import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceDashboardComponent } from './attendance-main.component';
import { DashboardDrawerModule } from '../../common-components/dashboard-drawer/dashboard-drawer.module';

@NgModule({
    declarations: [
        AttendanceDashboardComponent
    ],
    imports: [
        CommonModule,
        DashboardDrawerModule
    ],
    exports: [
        AttendanceDashboardComponent
    ]
})
export class AttendanceMainModule { }
