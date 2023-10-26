import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController ,NavController} from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import { Comuna } from '../../models/comuna';
import { Region } from '../../models/region';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})


export class RegistroPage implements OnInit {


  usuario:string='';
  contrasena:string='';
  rut:string= '';
  carrera:string='';
  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  seleccionComuna:boolean = true;

  
  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private locationService:LocationService,
    private storage:StorageService,
    private router:Router,
    private helper:HelperService) {
    
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


  registro() {
    if (this.usuario == '') {
      this.helper.showAlert('Debe ingresar un usuario', 'Error');
      return;
    }
    if (this.contrasena == '') {
      this.helper.showAlert('Debe ingresar una contraseña', 'Error');
      return;
    }
    if (this.rut == '') {
      this.helper.showAlert('Debe ingresar un rut', 'Error');
      return;
    }
    if (this.regionSel ===0) {
      this.helper.showAlert('Debe seleccionar una región', 'Error');
      return;
    }
    if (this.comunaSel===0) {
      this.helper.showAlert('Debe seleccionar una comuna', 'Error');
      return;
    }
    
    var usuario = [{
      usuario: this.usuario,
      contrasena: this.contrasena,
      rut: this.rut,
      region: this.regionSel,
      comuna: this.comunaSel 
    }];

    this.storage.guardarUsuario(usuario)
      .then(() => {
        // Éxito: el usuario se ha registrado correctamente
        this.helper.showAlert('Usuario registrado correctamente.', 'Información');

        // Redirige al usuario a la página de login
        this.router.navigate(['/login']);
      })
      .catch(error => {
        // Error: muestra un mensaje de error, pero no redirige al usuario
        this.helper.showAlert('Hubo un error al registrar el usuario', 'Error');
      });
  }
    
  }


  
  
  
