import { NgModule } from "@angular/core";
import { EntradasRoutingModule } from "./entradas-routing.module";
import { NbMenuModule } from "@nebular/theme";
import { EntradasTableComponent } from './entradas-table/entradas-table.component';
import { DetalleEntradasComponent } from './detalle-entradas/detalle-entradas.component';

@NgModule({
    imports: [
        EntradasRoutingModule,
        NbMenuModule
    ],
    declarations: [
    ]
})
export class EntradasModule {}