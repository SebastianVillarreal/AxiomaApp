import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CatModulosComponent } from "./cat-modulos/cat-modulos.component";

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'modulos',
                pathMatch: 'full'
            },
            {
                path: 'categorias-modulos',
                component: CatModulosComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministracionRoutingModule {}