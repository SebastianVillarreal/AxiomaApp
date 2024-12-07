import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";

import { RecetasRoutingModule } from "./recetas-routing.module";

@NgModule({
    imports: [
        RecetasRoutingModule,
        NbMenuModule
    ],
    declarations: [
    ]
})
export class RecetasModule {}