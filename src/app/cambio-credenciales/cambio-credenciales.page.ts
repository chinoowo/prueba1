import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController ,NavController} from '@ionic/angular';

@Component({
  selector: 'app-cambio-credenciales',
  templateUrl: './cambio-credenciales.page.html',
  styleUrls: ['./cambio-credenciales.page.scss'],
})


export class CambioCredencialesPage implements OnInit {

  formularioCambioClave: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {
    this.formularioCambioClave = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioCambioClave.value;

    if(this.formularioCambioClave.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    var usuario = {
      nombre: f.nombre,
      password: f.password
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));
    const confirmAlert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'Los datos se han guardado correctamente.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateForward(['/login']);
          }
        }
      ]
    });
  
    await confirmAlert.present();
  }

  

}
