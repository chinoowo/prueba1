import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresadoPageRoutingModule } from './ingresado-routing.module';

import { IngresadoPage } from './ingresado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresadoPageRoutingModule
  ],
  declarations: [IngresadoPage]
})
export class IngresadoPageModule {}
