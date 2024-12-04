import { NgModule } from "@angular/core";
import { OrdenesComprasRoutingModule } from "./ordenes-compras-routing.module";
import { NbMenuModule } from "@nebular/theme";

@NgModule({
    imports: [
        OrdenesComprasRoutingModule,
        NbMenuModule
    ]
})
export class OrdenesComprasModule {}