import { NgModule } from "@angular/core";
import { AdministracionRoutingModule } from "./administracion-routing.module";
import { NbMenuModule } from "@nebular/theme";
import { ModulosComponent } from './modulos/modulos.component';

@NgModule({
    imports: [AdministracionRoutingModule, NbMenuModule],
})
export class AdministracionModule {}