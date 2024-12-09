import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";
import { ComprasRoutingModule } from "./compras-routing.module";
import { EntradasComponent } from './entradas/entradas/entradas.component';

@NgModule({
    imports: [
        ComprasRoutingModule,
        NbMenuModule
    ],
    declarations: [
  
    EntradasComponent
  ]
})
export class ComprasModule {}