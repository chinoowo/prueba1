import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner } from 'capacitor-barcode-scanner'; 
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Geolocation } from '@capacitor/geolocation';
/* import { BarcodeScanner } from '@capacitor-community/barcode-scanner'; */
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-ingresado',
  templateUrl: './ingresado.page.html',
  styleUrls: ['./ingresado.page.scss'],
})
export class IngresadoPage implements OnInit {
  usuario: string = ''; // Inicializa la variable con un valor por defecto
  rut: string = '';
  carrera: string = '';
  isSupported = false;
  imagenes:any[]=[];
  latitude: number; // Declara la propiedad latitude
  longitude: number; // Declara la propiedad longitude
  resultadoScan:any=''



  constructor(private navCtrl: NavController,private alertController: AlertController,private storageService: StorageService, private route: ActivatedRoute,private sharedService: SharedService) { 
    this.latitude = 0; // Inicializa latitude con un valor por defecto
    this.longitude = 0; // Inicializa longitude con un valor por defecto
    this.route.queryParams.subscribe((params) => {
      this.usuario = this.sharedService.getUsuario();
      this.carrera = this.sharedService.getCarrera();
      this.rut = this.sharedService.getRut();
    });
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
    this.resultadoScan = (await  BarcodeScanner.scan()).code;
    console.log("Resultado scan",JSON.parse(this.resultadoScan));
  }


  volverARegistro() {
    this.navCtrl.navigateBack(['/registro']);
  }

  ngOnInit() {
    defineCustomElements(window)
    
  }

  async takePhoto() {
    var cSource = CameraSource.Prompt;
  
    if ((await Camera.checkPermissions()).camera == 'granted') {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        quality: 100,
        height: 1024,
        width: 1024,
        source: cSource,
        presentationStyle: 'popover',
        promptLabelCancel: 'Cancelar',
        promptLabelHeader: 'Seleccione',
        promptLabelPhoto: 'Desde la galería',
        promptLabelPicture: 'Desde la cámara',
      });
  
      if (image.webPath) {
        var blob = (await fetch(image.webPath)).blob();
        const nuevaImagen = { fname: 'foto.' + image.format, src: image.webPath, file: blob };
  
        // Borra la imagen anterior y muestra la nueva
        this.imagenes.splice(0, 1, nuevaImagen);
  
        console.log("Imagen guardada ===>", nuevaImagen);
      }
    }
  }
  
  

}