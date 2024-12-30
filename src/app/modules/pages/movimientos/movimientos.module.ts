import { NgModule } from "@angular/core";
import { MovimientosRoutingModule } from "./movimientos-routing.module";
import { NbMenuModule } from "@nebular/theme";
import { MovimientosComponent } from './movimientos/movimientos.component';
import { MovimientosTableComponent } from './movimientos-table/movimientos-table.component';

@NgModule({
    imports: [
        MovimientosRoutingModule,
        NbMenuModule
    ],
    declarations: [
      MovimientosComponent,
      MovimientosTableComponent
    ],
})
export class MovimientosModule{}