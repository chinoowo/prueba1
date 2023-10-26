import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioCredencialesPageRoutingModule } from './cambio-credenciales-routing.module';

import { CambioCredencialesPage } from './cambio-credenciales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CambioCredencialesPageRoutingModule
  ],
  declarations: [CambioCredencialesPage]
})
export class CambioCredencialesPageModule {}
