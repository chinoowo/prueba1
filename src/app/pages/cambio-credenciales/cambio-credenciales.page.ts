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
  selector: 'app-cambio-credenciales',
  templateUrl: './cambio-credenciales.page.html',
  styleUrls: ['./cambio-credenciales.page.scss'],
})


export class CambioCredencialesPage implements OnInit {


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


  async actualizarCredenciales() {
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
    if (this.carrera == '') {
      this.helper.showAlert('Debe ingresar una carrera', 'Error');
      return;
    }
    if (this.regionSel === 0) {
      this.helper.showAlert('Debe seleccionar una región', 'Error');
      return;
    }
    if (this.comunaSel === 0) {
      this.helper.showAlert('Debe seleccionar una comuna', 'Error');
      return;
    }
  
    // Verifica si el "rut" ya existe en las preferencias
    const userStorage = await this.storage.obtenerUsuario();
    const usuarioExistente = userStorage.find((usuario) => usuario.rut === this.rut);
  
    if (usuarioExistente) {
      // El "rut" existe, actualiza el usuario
      const nuevoUsuario = {
        usuario: this.usuario,
        contrasena: this.contrasena,
        carrera: this.carrera,
        rut: this.rut,
        region: this.regionSel,
        comuna: this.comunaSel,
      };
  
      this.storage.actualizarUsuario(nuevoUsuario)
        .then(() => {
          this.helper.showAlert('Credenciales actualizadas correctamente.', 'Información');
          this.router.navigate(['/login']);
        })
        .catch(error => {
          this.helper.showAlert('Hubo un error al actualizar las credenciales', 'Error');
        });
    } else {
      // El "rut" no existe en las preferencias, muestra un mensaje
      this.helper.showAlert('Usuario no encontrado. El rut no está registrado.', 'Error');
    }
  }
    
  }