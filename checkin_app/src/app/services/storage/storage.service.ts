import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Guardar un valor en el localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener un valor del localStorage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Eliminar un valor del localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el localStorage
  clear(): void {
    localStorage.clear();
  }
}
