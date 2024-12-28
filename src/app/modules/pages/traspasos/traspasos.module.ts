import { NgModule } from "@angular/core";
import { TraspasosRoutingModule } from "./traspasos-routing.module";
import { NbMenuModule } from "@nebular/theme";
import { DetalleTraspasosComponent } from './detalle-traspasos/detalle-traspasos.component';

@NgModule(
    {
        imports: [
            TraspasosRoutingModule,
            NbMenuModule
        ],
        declarations: [
          DetalleTraspasosComponent
        ]
    }
)
export class TraspasosModule { }