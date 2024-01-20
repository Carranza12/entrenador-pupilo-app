import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from 'src/app/models/select.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rol: new FormControl('', [Validators.required]),
  });

  roleOptions: SelectOption[] = [];

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  ngOnInit() {
    this.roleOptions = this.utilsSvc.getRoleOptions();
  }

  async submit() {
    console.log('FORM:', this.form.value);
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      loading.present();
      this.firebaseSvc
        .signUp(this.form.value as User)
        .then(async (res) => {
          await this.firebaseSvc.updateUser(this.form.value.name);
          console.log('res:', res);
          let uid = res.user.uid;
          this.form.controls.uid.setValue(uid);
          this.setUserInfo(uid);
        })
        .catch((error) => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'danger',
            position: 'bottom',
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }

  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      loading.present();
      let path = `users/${uid}`;
      delete this.form.value.password,
        await this.firebaseSvc
          .setDocument(path, this.form.value)
          .then((res) => {
            this.utilsSvc.saveInLocalStorage('user', this.form.value);
            this.utilsSvc.routerLink('/main/home');
            this.form.reset();
          })
          .catch((error) => {
            console.log(error);
            this.utilsSvc.presentToast({
              message: error.message,
              duration: 2500,
              color: 'danger',
              position: 'bottom',
              icon: 'alert-circle-outline',
            });
          })
          .finally(() => {
            loading.dismiss();
          });
    }
  }
}
