import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router';
import {AppComponent} from "./app.component";
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardGroupComponent,
    ColComponent,
    ContainerComponent, FormControlDirective, FormDirective, InputGroupComponent, InputGroupTextDirective,
    RowComponent,
    SharedModule,
    TextColorDirective
} from "@coreui/angular";
import {AuthService} from "../service/auth.service";
import {routes} from "./app.routes";
import { SignInComponent } from './views/pages/pages/sign-in/sign-in.component';
import {IconDirective} from "@coreui/icons-angular";
import {NgStyle} from "@angular/common";
import {PagesModule} from "./views/pages/pages/pages.module";




const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules,
    useHash: true
};



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle,


        // all common module
        SharedModule,
        BrowserModule,
        PagesModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, routerConfig),

    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
