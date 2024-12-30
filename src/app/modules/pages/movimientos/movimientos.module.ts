import { NgModule } from "@angular/core";
import { MovimientosRoutingModule } from "./movimientos-routing.module";
import { NbMenuModule } from "@nebular/theme";
import { MovimientosComponent } from './movimientos/movimientos.component';

@NgModule({
    imports: [
        MovimientosRoutingModule,
        NbMenuModule
    ],
    declarations: [
      MovimientosComponent
    ],
})
export class MovimientosModule{}