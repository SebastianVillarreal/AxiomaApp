import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecetasComponent } from "./recetas/recetas.component";
import { RecetasTableComponent } from "./recetas-table/recetas-table.component";
import { DetalleRecetasComponent } from "./detalle-recetas/detalle-recetas.component";

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
                component: RecetasComponent,
                title: 'Nueva Receta'
            },
            {
                path: 'editar/:id', component: RecetasComponent,
                title: 'Editar Receta'
            },
            {
                path: 'listado',
                component: RecetasTableComponent,
                title: 'Listado de Recetas'
            },
            {
                path: 'detalles/:id',
                component: DetalleRecetasComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class RecetasRoutingModule {
  }