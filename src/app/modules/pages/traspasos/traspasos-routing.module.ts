import { Router, RouterModule, Routes } from "@angular/router";
import { TraspasosComponent } from "./traspasos/traspasos.component";
import { NgModule } from "@angular/core";
import { DetalleTraspasosComponent } from "./detalle-traspasos/detalle-traspasos.component";
import { TraspasosTableComponent } from "./traspasos-table/traspasos-table.component";

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
                component: TraspasosComponent,
                title: 'Nuevo Traspaso'
            },
            {
                path: 'listado',
                component: TraspasosTableComponent,
                title: 'Listado de Traspasos'
            },
            {
                path: 'detalles/:id',
                component: DetalleTraspasosComponent,
                title: 'Detalles Traspaso'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TraspasosRoutingModule {
    
}