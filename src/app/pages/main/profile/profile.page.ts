import { Component, OnInit, SimpleChanges, inject } from '@angular/core';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  imagesPreview = [];
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  user!: any;
  constructor() {}

  ngOnInit() {
    this.getUser();
    this.imagesPreview = [
      {
        src: 'https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/2022-12/running-consejos-principiantes.jpg.webp?itok=Y1qsCYZQ',
      },
      {
        src: 'https://images.ecestaticos.com/2RHhvZok-LK_YmQMx_bgkDLva2A=/171x7:2014x1379/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F75f%2F9e9%2F366%2F75f9e936636d81c037dfb51f5be192fb.jpg',
      },
      {
        src: 'https://www.sportlife.es/uploads/s1/98/60/29/2/20-razones-para-empezar-a-correr.jpeg',
      },
      {
        src: '../../../../assets/images/no-image-profile-slider.jpg',
      },
    ];
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getUser();
      event.target.complete();
    }, 1000);
  }

  openEditProfile() {
    console.log('open edit profile page');
    this.utilsSvc.routerLink(`/main/profile/edit/${this.user.uid}`);
  }

  async getUser() {
    const user = this.utilsSvc.getFromLocalStorage('user');
    const loading = await this.utilsSvc.loading();
    loading.present();
    let path = `users/${user.uid}`;
    await this.firebaseSvc
      .getDocument(path)
      .then((user: any) => {
        this.user = user;
        console.log('usuario:', user);
        this.user.photoProfile = user.photoProfile
          ? user.photoProfile
          : '../../../../assets/images/photo-profile-default.webp';
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
