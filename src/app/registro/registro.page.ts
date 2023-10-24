import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController ,NavController} from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import { Comuna } from '../models/comuna';
import { Region } from '../models/region';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})


export class RegistroPage implements OnInit {



  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  seleccionComuna:boolean = true;

  formularioRegistro: FormGroup;
  
  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private locationService:LocationService) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'carrera': new FormControl("",Validators.required),
      'rut': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.cargarRegion();
  }

  async cargarRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna(){
    this.seleccionComuna = false;
    const req = await this.locationService.getComuna(this.regionSel);
    this.comunas = req.data;
  }



  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
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
      rut: f.rut,
      carrera: f.carrera,
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