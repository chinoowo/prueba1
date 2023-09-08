import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
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
  barcodes: Barcode[] = [];

  constructor(private navCtrl: NavController,private alertController: AlertController) { }

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
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Por favor, conceda permiso a la cámara para utilizar el escáner de código de barras',
      buttons: ['OK'],
    });
    await alert.present();
  }

}