import { Component } from '@angular/core';
import { MENU_ITEMS } from 'src/app/modules/pages/pages-menu';
import { NbSidebarModule,
         NbSidebarComponent,
         NbSidebarService,
         NbMenuModule,
         NbMenuComponent,
         NbMenuService,
 } from '@nebular/theme';
import { NbMenuInternalService } from '@nebular/theme/components/menu/menu.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NbSidebarModule,NbMenuModule],
  providers: [NbSidebarComponent, NbMenuComponent, NbSidebarService, NbMenuService],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
menu = MENU_ITEMS;
}
