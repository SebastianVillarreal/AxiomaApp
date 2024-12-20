import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { PagesRoutingModule } from './pages-routing.module';
import { CatModulosComponent } from './administracion/cat-modulos/cat-modulos.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    NbMenuModule,
  ],
  declarations: [
    
    CatModulosComponent
  ],
})
export class PagesModule {
}
