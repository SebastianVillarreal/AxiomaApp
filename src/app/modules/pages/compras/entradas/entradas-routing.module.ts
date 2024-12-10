import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EntradasComponent } from "./entradas/entradas.component";
import { EntradasTableComponent } from "./entradas-table/entradas-table.component";

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
                component: EntradasComponent,
                title: 'Nueva Entrada'
            },
            {
                path: 'listado',
                component: EntradasTableComponent,
                title: 'Listado de Entradas'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntradasRoutingModule {}