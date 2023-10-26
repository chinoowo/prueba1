import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresadoPage } from './ingresado.page';

const routes: Routes = [
  {
    path: '',
    component: IngresadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresadoPageRoutingModule {}
