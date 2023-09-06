import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingresado',
  templateUrl: './ingresado.page.html',
  styleUrls: ['./ingresado.page.scss'],
})
export class IngresadoPage implements OnInit {
  nombre: string = ''; // Inicializa la variable con un valor por defecto

  constructor(private navCtrl: NavController) { }

  ionViewWillEnter() {
    // En el evento ionViewWillEnter, obtén el nombre de usuario actualizado del localStorage
    const usuarioJSON = localStorage.getItem('usuario');

    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      this.nombre = usuario.nombre; // Asigna el nombre a la variable
    }
  }

  volverARegistro() {
    this.navCtrl.navigateBack(['/registro']);
  }

  ngOnInit() {
    // Mantén el código existente aquí si hay alguna otra lógica de inicialización
  }
}