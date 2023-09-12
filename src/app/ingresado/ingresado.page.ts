import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-ingresado',
  templateUrl: './ingresado.page.html',
  styleUrls: ['./ingresado.page.scss'],
})
export class IngresadoPage implements OnInit {
  nombre: string = ''; // Inicializa la variable con un valor por defecto
  rut: string = '';
  carrera: string = '';
  isSupported = false;


  constructor(private navCtrl: NavController,private alertController: AlertController) { }


async scan(){
  const resultadoQr = (await BarcodeScanner.scan()).code;
  alert("Codigo --->" + resultadoQr)
  

}


  ionViewWillEnter() {
    // En el evento ionViewWillEnter, obtén el nombre de usuario actualizado del localStorage
    const usuarioJSON = localStorage.getItem('usuario');

    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      this.nombre = usuario.nombre; // Asigna el nombre a la variable
    }

    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      this.rut = usuario.rut; // Asigna el nombre a la variable
    }

    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      this.carrera = usuario.carrera; // Asigna el nombre a la variable
    }


  }

  volverARegistro() {
    this.navCtrl.navigateBack(['/registro']);
  }

  ngOnInit() {

  }
  

}