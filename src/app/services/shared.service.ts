import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private usuario!: string;
  private carrera!: string;
  private rut!: string;

  setUsuario(usuario: string) {
    this.usuario = usuario;
  }

  setCarrera(carrera: string) {
    this.carrera = carrera;
  }

  setRut(rut: string) {
    this.rut = rut;
  }

  getUsuario(): string {
    return this.usuario;
  }

  getCarrera(): string {
    return this.carrera;
  }

  getRut(): string {
    return this.rut;
  }
}