import { RouterModule, Routes } from "@angular/router"
import { NgModule } from "@angular/core"

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'ordenes-compras',
                pathMatch: 'full'
            },
            {
                path: 'ordenes-compras',
                loadChildren: () => import('./ordenes-compras/ordenes-compras.module').then(m => m.OrdenesComprasModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
    export class ComprasRoutingModule {}
