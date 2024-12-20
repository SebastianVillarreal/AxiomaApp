import { NgModule } from "@angular/core";
import { AdministracionRoutingModule } from "./administracion-routing.module";
import { NbMenuModule } from "@nebular/theme";

@NgModule({
    imports: [AdministracionRoutingModule, NbMenuModule]
})
export class AdministracionModule {}