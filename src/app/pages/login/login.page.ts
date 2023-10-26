import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:string='';
  contrasena:string='';


  constructor(private storageService: StorageService, 
    private router: Router,
    private helper: HelperService,
    private sharedService: SharedService) { 

  

  }

  ngOnInit() {
  }
  

  async login() {
    const usuario = this.usuario;
    const contrasena = this.contrasena;

    const usuariosAlmacenados = await this.storageService.obtenerUsuario();

    // Verificar credenciales
    const usuarioEncontrado = usuariosAlmacenados.find((user) => user.usuario === usuario && user.contrasena === contrasena);

    if (usuarioEncontrado) {
      const { usuario, carrera, rut } = usuarioEncontrado;
      this.sharedService.setUsuario(usuarioEncontrado.usuario);
      this.sharedService.setCarrera(usuarioEncontrado.carrera);
      this.sharedService.setRut(usuarioEncontrado.rut);

      console.log("Nombre: " + usuario);
      console.log("Carrera: " + carrera);
      console.log("Rut: " + rut);
      
      // Autenticación exitosa
      // Redirige al usuario a la página "ingresado"
      this.router.navigate(['/ingresado']);
    } else {
      // Credenciales incorrectas
      this.helper.showAlert('Credenciales incorrectas','Error');
    }
  }

}