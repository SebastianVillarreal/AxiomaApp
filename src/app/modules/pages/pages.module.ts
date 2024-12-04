import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { PagesRoutingModule } from './pages-routing.module';
import { OrdenesComprasComponent } from './ordenes-compras/ordenes-compras/ordenes-compras.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    NbMenuModule,
  ],
  declarations: [
  
    OrdenesComprasComponent
  ],
})
export class PagesModule {
}
