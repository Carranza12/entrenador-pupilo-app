import { Injectable, inject } from '@angular/core';
import {
  LoadingController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { SelectOption } from '../models/select.model';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingCtr = inject(LoadingController);
  toastCtrl = inject(ToastController);

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
}
