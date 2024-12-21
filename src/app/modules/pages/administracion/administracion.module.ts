import { NgModule } from "@angular/core";
import { AdministracionRoutingModule } from "./administracion-routing.module";
import { NbMenuModule } from "@nebular/theme";
import { ModulosComponent } from './modulos/modulos.component';
import { PersonasComponent } from './personas/personas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
    imports: [AdministracionRoutingModule, NbMenuModule],
})
export class AdministracionModule {}