import { NgModule } from "@angular/core";
import { MovimientosRoutingModule } from "./movimientos-routing.module";
import { NbMenuModule } from "@nebular/theme";

@NgModule({
    imports: [
        MovimientosRoutingModule,
        NbMenuModule
    ],
})
export class MovimientosModule{}