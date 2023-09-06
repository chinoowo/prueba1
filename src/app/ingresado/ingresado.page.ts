import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController ,NavController} from '@ionic/angular';

@Component({
  selector: 'app-ingresado',
  templateUrl: './ingresado.page.html',
  styleUrls: ['./ingresado.page.scss'],
})
export class IngresadoPage implements OnInit {
  nombre: string = ''; // Inicializa la variable con un valor por defecto

  constructor() { }

  ngOnInit() {
    // Intenta obtener el nombre de usuario almacenado en localStorage
    const usuarioJSON = localStorage.getItem('usuario');

    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      this.nombre = usuario.nombre; // Asigna el nombre a la variable
    }
  }
}
