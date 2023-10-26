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
    private helper: HelperService) { 

  

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
      // Autenticación exitosa
      // Redirige al usuario a la página "ingresado"
      this.router.navigate(['/ingresado']);
    } else {
      // Credenciales incorrectas
      this.helper.showAlert('Credenciales incorrectas','Error');
    }
  }

}