import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { NbLayoutModule,
         NbLayoutComponent,
         NbSidebarModule,
         NbSidebarComponent,
         NbMenuModule,
         NbMenuComponent,
         NbSidebarService,
         NbMenuService
 } from '@nebular/theme';

 import { MENU_ITEMS } from 'src/app/modules/pages/pages-menu';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, NbLayoutModule, NbSidebarModule, NbMenuModule, RouterModule],
  providers: [NbLayoutComponent, NbMenuComponent, NbSidebarComponent,NbSidebarService, NbMenuComponent,NbMenuService],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  menu = MENU_ITEMS;
  // private router = inject(Router);

  // onMenuClick(event: MouseEvent): void {
  //   const target = event.target as HTMLElement;


  //   if(target.classList.contains('menu-title')){
  //     const parentItem = target.closest('.menu-item') as HTMLElement;

  //     const link = parentItem?.getAttribute('ng-reflect-link');

  //     if (link) {
  //       this.router.navigateByUrl(link);
  //     }

  //     event.stopPropagation();
  //   }
  // }
}
