import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../auth/guards/auth.guard";
import {DashboardComponent} from "./dashboard.component";


const routes: Routes = [
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
     /*   component: BofLayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },*/
        children: [
            {path: '', component: DashboardComponent},


        ]
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class DashboardHomeRouting {
}
