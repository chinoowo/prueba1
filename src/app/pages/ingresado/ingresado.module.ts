import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresadoPageRoutingModule } from './ingresado-routing.module';

import { IngresadoPage } from './ingresado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IngresadoPageRoutingModule
  ],
  declarations: [IngresadoPage]
})
export class IngresadoPageModule {}
