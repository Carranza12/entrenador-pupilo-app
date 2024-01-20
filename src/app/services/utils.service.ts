import { Injectable, inject } from '@angular/core';
import {
  LoadingController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { SelectOption } from '../models/select.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingCtr = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  loading() {
    return this.loadingCtr.create({ spinner: 'lines-sharp' });
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  getRoleOptions(): SelectOption[] {
    return [
      {
        text: 'Entrenador',
        value: 'entrenador',
      },
      {
        text: 'Pupilo',
        value: 'pupilo',
      },
    ];
  }

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
