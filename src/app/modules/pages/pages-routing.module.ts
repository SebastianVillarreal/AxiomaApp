import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { BancosComponent } from './bancos/bancos.component';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { InsumosComponent } from './insumos/insumos.component';
import { RecetasComponent } from './recetas/recetas/recetas.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ExistenciasComponent } from './existencias/existencias.component';
import { UnidadMedidaComponent } from './unidad-medida/unidad-medida.component';

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
      path: 'unidades-medida',
      component: UnidadMedidaComponent,
      title: 'Unidades de Medida'
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
      path: 'existencias',
      component: ExistenciasComponent,
      title: 'Existencias'
    },
    {
      path: 'recetas',
      loadChildren: () => import('./recetas/recetas.module').then(m => m.RecetasModule)
    },
    {
      path: 'compras',
      loadChildren: () => import('./compras/compras.module').then(m => m.ComprasModule)
    },
    {
      path: 'traspasos',
      loadChildren: () => import('./traspasos/traspasos.module').then(m =>m.TraspasosModule)
    },
    {
      path: 'movimientos',
      loadChildren: () => import('./movimientos/movimientos.module').then(m => m.MovimientosModule)
    },
    {
      path: 'sucursales',
      component: SucursalesComponent,
      title: 'Sucursales'
    },
    {
      path: 'proveedores',
      component: ProveedoresComponent,
      title: 'Proveedores'
    },
    {
      path: 'administracion',
      loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule)
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
