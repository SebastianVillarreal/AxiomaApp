import { Component, OnDestroy, OnInit } from '@angular/core';
import { 
         NbLayoutModule, 
         NbLayoutComponent,
         NbActionsModule,
         NbActionComponent,
         NbActionsComponent,
         NbUserModule,
         NbUserComponent } from '@nebular/theme';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NbLayoutModule, NbActionsModule, NbUserModule],
  providers: [NbLayoutComponent, NbActionComponent, NbUserComponent, NbActionsComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  

}
