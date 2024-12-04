import { RouterModule, Routes } from "@angular/router"
import { OrdenesComprasComponent } from "./ordenes-compras/ordenes-compras.component"
import { NgModule } from "@angular/core"

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'listado',
                pathMatch: 'full'
            },
            {
                path: 'nueva',
                component: OrdenesComprasComponent,
                title: 'Nueva Orden de Compra'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdenesComprasRoutingModule {

}