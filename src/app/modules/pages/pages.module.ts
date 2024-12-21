import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { PagesRoutingModule } from './pages-routing.module';
import { CatModulosComponent } from './administracion/cat-modulos/cat-modulos.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    NbMenuModule,
  ],
})
export class PagesModule {
}
