import { NgModule } from "@angular/core";
import { TraspasosRoutingModule } from "./traspasos-routing.module";
import { NbMenuModule } from "@nebular/theme";
import { DetalleTraspasosComponent } from './detalle-traspasos/detalle-traspasos.component';
import { TraspasosTableComponent } from './traspasos-table/traspasos-table.component';

@NgModule(
    {
        imports: [
            TraspasosRoutingModule,
            NbMenuModule
        ],
    }
)
export class TraspasosModule { }