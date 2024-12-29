import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { PagesRoutingModule } from './pages-routing.module';
import { CatModulosComponent } from './administracion/cat-modulos/cat-modulos.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ExistenciasComponent } from './existencias/existencias.component';
import { UnidadMedidaComponent } from './unidad-medida/unidad-medida.component';
import { TraspasosComponent } from './traspasos/traspasos/traspasos.component';
import { TiposMovimientosComponent } from './movimientos/tipos-movimientos/tipos-movimientos.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    NbMenuModule,
  ],
  declarations: [
    TiposMovimientosComponent
  ],
})
export class PagesModule {
}
