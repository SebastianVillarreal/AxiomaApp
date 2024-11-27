import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { PagesRoutingModule } from './pages-routing.module';
import { ArticulosComponent } from './articulos/articulos.component';
import { InsumosComponent } from './insumos/insumos.component';
import { RecetasComponent } from './recetas/recetas.component';
import { DetalleRecetasComponent } from './detalle-recetas/detalle-recetas.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    NbMenuModule,
  ],
  declarations: [],
})
export class PagesModule {
}
