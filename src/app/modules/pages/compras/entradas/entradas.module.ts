import { NgModule } from "@angular/core";
import { EntradasRoutingModule } from "./entradas-routing.module";
import { NbMenuModule } from "@nebular/theme";
import { EntradasTableComponent } from './entradas-table/entradas-table.component';

@NgModule({
    imports: [
        EntradasRoutingModule,
        NbMenuModule
    ],
    declarations: [
  ]
})
export class EntradasModule {}