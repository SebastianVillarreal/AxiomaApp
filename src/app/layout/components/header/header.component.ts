import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService,
         NbMenuService, 
         NbSidebarService, 
         NbTemplatePortal, 
         NbThemeService, 
         NbLayoutModule, 
         NbLayoutComponent,
         NbActionsModule,
         NbActionComponent,
         NbActionsComponent,
         NbUserModule,
         NbUserComponent } from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NbLayoutModule, NbActionsModule, NbUserModule],
  providers: [NbLayoutComponent, NbActionComponent, NbUserComponent, NbActionsComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // private destroy$: Subject<void> = new Subject<void>();
  // userPictureOnly: boolean = false;
  // user: any;

  // userMenu = [{title: 'Cerrar Sesión'}];

  // // constructor(
  // //   private sidebarService: NbSidebarService,
  // //   private menuService: NbMenuService,
  // //   private themeService: NbThemeService,
  // //   private breakpointService: NbMediaBreakpointsService
  // // )

  

}
