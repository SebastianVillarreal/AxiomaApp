import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { BancosComponent } from './bancos/bancos.component';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { InsumosComponent } from './insumos/insumos.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
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
