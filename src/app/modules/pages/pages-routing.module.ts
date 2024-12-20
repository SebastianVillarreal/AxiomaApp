import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { BancosComponent } from './bancos/bancos.component';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { InsumosComponent } from './insumos/insumos.component';
import { RecetasComponent } from './recetas/recetas/recetas.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '',
      redirectTo: 'bancos',
      pathMatch: 'full'
    },
    {
      path: 'bancos',
      component: BancosComponent,
      title: 'Bancos'
    },
    {
      path: 'articulos',
      component: ArticulosComponent,
      title: 'Artículos'
    },
    {
      path: 'insumos',
      component: InsumosComponent,
      title: 'Insumos'
    },
    {
      path: 'recetas',
      loadChildren: () => import('./recetas/recetas.module').then(m => m.RecetasModule)
    },
    {
      path: 'ordenes-compras',
      loadChildren: () => import('./ordenes-compras/ordenes-compras.module').then(m => m.OrdenesComprasModule)
    }
    // {
    //   path: '**',
    //   component: NotFoundComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
