import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
/* import { BarcodeScanner } from 'capacitor-barcode-scanner'; */
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Geolocation } from '@capacitor/geolocation';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { StorageService } from 'src/app/services/storage.service';

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
  imagenes:any[]=[];
  latitude: number; // Declara la propiedad latitude
  longitude: number; // Declara la propiedad longitude
  resultadoQrr:string='';



  constructor(private navCtrl: NavController,private alertController: AlertController,private storageService: StorageService) { 
    this.latitude = 0; // Inicializa latitude con un valor por defecto
    this.longitude = 0; // Inicializa longitude con un valor por defecto
  }



  async printCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const latitude = coordinates.coords.latitude;
      const longitude = coordinates.coords.longitude;
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
  
      // Aquí puedes hacer lo que desees con las coordenadas, como mostrarlas en la interfaz de usuario
      // Por ejemplo, puedes asignarlas a variables en tu clase y mostrarlas en la interfaz.
  
      this.latitude = latitude;
      this.longitude = longitude;
  
    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
    }
  }


async scan(){
  const resultadoQr =JSON.stringify(await BarcodeScanner.startScan());
  this.resultadoQrr=resultadoQr;
  
}


  volverARegistro() {
    this.navCtrl.navigateBack(['/registro']);
  }

  ngOnInit() {
    defineCustomElements(window)
  }

  async takePhoto(){

    var cSource = CameraSource.Prompt;

    if ((await Camera.checkPermissions()).camera == 'granted'){
      const image = await Camera.getPhoto({
        resultType:CameraResultType.Uri,
        quality:100,
        height:1024,
        width:1024,
        source:cSource,
        presentationStyle:'popover',
        promptLabelCancel:'Cancelar',
        promptLabelHeader:'Seleccione',
        promptLabelPhoto:'Desde la galeria',
        promptLabelPicture:'Desde la camara'
      });

      if (image.webPath){
        var blob = (await fetch(image.webPath)).blob();
        this.imagenes.unshift({fname:'foto.'+image.format, src:image.webPath, file:blob})
      }

      console.log("Imagenes guardadas ===>", this.imagenes);
      

    }
  }
  

}