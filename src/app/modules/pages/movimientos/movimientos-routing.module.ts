import { RouterModule, Routes } from "@angular/router";
import { TiposMovimientosComponent } from "./tipos-movimientos/tipos-movimientos.component";
import { NgModule } from "@angular/core";
import { MovimientosComponent } from "./movimientos/movimientos.component";

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
                path: 'tipos',
                component: TiposMovimientosComponent,
                title: 'Tipos de Movimientos'
            },
            {
                path: 'nuevo',
                component: MovimientosComponent,
                title: 'Nuevo Movimiento'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovimientosRoutingModule {}