import { Component, OnDestroy, OnInit } from '@angular/core';
import { 
         NbLayoutModule, 
         NbLayoutComponent,
         NbActionsModule,
         NbActionComponent,
         NbActionsComponent,
         NbUserModule,
         NbUserComponent,
         NbContextMenuModule,
         NbIconModule,
         NbSidebarService, } from '@nebular/theme';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NbLayoutModule, NbActionsModule, NbUserModule, NbContextMenuModule, NbIconModule],
  providers: [NbLayoutComponent, NbActionComponent, NbUserComponent, NbActionsComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userPictureOnly: boolean = false;
  user: string = "";
  userMenu = [{title:"Cerrar Sesión"}]

  constructor(private sidebarService: NbSidebarService){}

  ngOnInit(): void {
    this.user = (localStorage.getItem('nombrePersona'))??'Otro';
  }

  toggleSidebar(): boolean{
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }
}
