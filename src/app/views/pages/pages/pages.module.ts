import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from "./sign-in/sign-in.component";
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent, CardHeaderComponent,
  ColComponent, ContainerComponent, DropdownComponent, DropdownToggleDirective, FormControlDirective,
  InputGroupComponent,
  RowComponent
} from "@coreui/angular";
import {InputGroupsComponent} from "./input-groups/input-groups.component";
import {RouterLink} from "@angular/router";
import {FormControlsComponent} from "./form-controls/form-controls.component";
import {RegisterComponent} from "./register/register.component";



@NgModule({
  declarations: [SignInComponent,
    InputGroupsComponent,
    FormControlsComponent,
    RegisterComponent],
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    CardBodyComponent,
    CardComponent,
    InputGroupComponent,
    CardGroupComponent,
    ContainerComponent,
    ButtonDirective,
    CardHeaderComponent,
    RouterLink,
    DropdownComponent,
    DropdownToggleDirective,
    FormControlDirective
  ]
})
export class PagesModule { }
