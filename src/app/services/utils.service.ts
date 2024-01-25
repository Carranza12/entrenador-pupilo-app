import { Injectable, inject } from '@angular/core';
import {
  LoadingController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { SelectOption } from '../models/select.model';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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

  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Toma una foto',
    });
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

  getTeamTypesOptions(): SelectOption[]{
    return [
      {
        text: 'Publico',
        value: 'publico',
      },
      {
        text: 'Privado',
        value: 'privado',
      },
    ]
  }

  routerLink(url: string, navigationExtras?: any) {
    if (navigationExtras) {
      return this.router.navigateByUrl(url, navigationExtras);
    }
    return this.router.navigateByUrl(url);
  }

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
