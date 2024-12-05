import { RouterModule, Routes } from "@angular/router"
import { OrdenesComprasComponent } from "./ordenes-compras/ordenes-compras.component"
import { NgModule } from "@angular/core"
import { DetalleOrdenesComprasComponent } from "./detalle-ordenes-compras/detalle-ordenes-compras.component"

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
            },
            {
                path: 'detalles/:id',
                component: DetalleOrdenesComprasComponent
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