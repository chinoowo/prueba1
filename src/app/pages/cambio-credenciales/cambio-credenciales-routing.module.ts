import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioCredencialesPage } from './cambio-credenciales.page';

const routes: Routes = [
  {
    path: '',
    component: CambioCredencialesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioCredencialesPageRoutingModule {}
