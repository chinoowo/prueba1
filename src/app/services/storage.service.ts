import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const storageUsuario = 'usuarioData';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  async setItem(llave:string,valor:string){
    await Preferences.set({key:llave,value:valor})
  }

  async getItem(llave:string):Promise<string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;
  }

  async guardarUsuario(user:any[]){
    var userStorage = await this.obtenerUsuario();

    for (const i of userStorage) {
      if (i) {
        user.push(i);
      }
    }
    this.setItem(storageUsuario,JSON.stringify(user));
  }

  async obtenerUsuario(){
    const storageData = await this.getItem(storageUsuario);

    if (storageData == null) {
      return [];
    }

    const data:any[] = JSON.parse(storageData);

    if (data) {
      return data;
    }
    else{
      return [];
    }
  }

  async actualizarUsuario(user: any) {
    const userStorage = await this.obtenerUsuario();

    let updatedUsers: any[] = [];

    if (userStorage && userStorage.length > 0) {
      // Actualiza la preferencia existente si el usuario ya está almacenado
      const userIndex = userStorage.findIndex((u) => u.rut === user.rut);

      if (userIndex !== -1) {
        // Copia todos los campos del nuevo usuario en el usuario existente
        userStorage[userIndex] = { ...userStorage[userIndex], ...user };
        updatedUsers = userStorage;
      } else {
        // Agrega el nuevo usuario a las preferencias existentes
        updatedUsers = [...userStorage, user];
      }
    } else {
      // Si no hay preferencias existentes, crea un nuevo usuario
      updatedUsers = [user];
    }

    this.setItem(storageUsuario, JSON.stringify(updatedUsers));
  }


}


  

