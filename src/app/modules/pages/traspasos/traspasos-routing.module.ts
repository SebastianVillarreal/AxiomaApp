import { Router, RouterModule, Routes } from "@angular/router";
import { TraspasosComponent } from "./traspasos/traspasos.component";
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
                path: 'nueva',
                component: TraspasosComponent,
                title: 'Nuevo Traspaso'
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