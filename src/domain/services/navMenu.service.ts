import { Injectable } from '@angular/core';
import {INavData} from "@coreui/angular";

@Injectable({
  providedIn: 'root',
})
export class NavMenuService {
  getMenuList(roleId: number): INavData[]{
    if(roleId == 1){
      return [
        {
          name: 'Accordion',
          url: '/base/accordion',
          icon: 'nav-icon-bullet'
        },
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'nav-icon-bullet'
        },
      ]
    }
    return [];
  }
}
