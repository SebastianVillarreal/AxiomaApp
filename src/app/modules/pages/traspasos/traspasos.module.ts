import { NgModule } from "@angular/core";
import { TraspasosRoutingModule } from "./traspasos-routing.module";
import { NbMenuModule } from "@nebular/theme";

@NgModule(
    {
        imports: [
            TraspasosRoutingModule,
            NbMenuModule
        ]
    }
)
export class TraspasosModule { }