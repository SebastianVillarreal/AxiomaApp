import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CatModulosComponent } from "./cat-modulos/cat-modulos.component";
import { ModulosComponent } from "./modulos/modulos.component";
import { PersonasComponent } from "./personas/personas.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'categorias-modulos',
                pathMatch: 'full'
            },
            {
                path: 'categorias-modulos',
                component: CatModulosComponent
            },
            {
                path: 'modulos',
                component: ModulosComponent
            },
            {
                path: 'personas',
                component: PersonasComponent
            },
            {
                path: 'usuarios',
                component: UsuariosComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministracionRoutingModule {}