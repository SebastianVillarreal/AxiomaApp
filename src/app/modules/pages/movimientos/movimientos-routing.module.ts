import { RouterModule, Routes } from "@angular/router";
import { TiposMovimientosComponent } from "./tipos-movimientos/tipos-movimientos.component";
import { NgModule } from "@angular/core";

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
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovimientosRoutingModule {}