import { NgModule } from "@angular/core";
import { EntradasRoutingModule } from "./entradas-routing.module";
import { NbMenuModule } from "@nebular/theme";

@NgModule({
    imports: [
        EntradasRoutingModule,
        NbMenuModule
    ],
    declarations: []
})
export class EntradasModule {}