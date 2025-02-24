import {NgModule} from '@angular/core';
import {DashboardHomeRouting} from './dashboard-home.routing.module';
import {SharedModule} from "@coreui/angular";
import {DashboardComponent} from "./dashboard.component";


@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        SharedModule,
        DashboardHomeRouting
    ]
})
export class DashboardModule {
}
