import { NgModule } from "@angular/core";
import { RecetasRoutingModule } from "../recetas/recetas-routing.module";
import { NbMenuModule } from "@nebular/theme";
import { ComprasRoutingModule } from "./compras-routing.module";

@NgModule({
    imports: [
        ComprasRoutingModule,
        NbMenuModule
    ],
    declarations: []
})
export class ComprasModule {}