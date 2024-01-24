import { Component, OnInit , ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user!:any;
  user_uid!: string;
  form = new FormGroup({
    file: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(
    public firebaseSvc: FirebaseService,
    private route: ActivatedRoute,
    public utilsSvc: UtilsService,
    private cdr: ChangeDetectorRef
   
  ) {}

  ngOnInit() {
    
    this.route.paramMap.subscribe((params) => {
      this.user_uid = params.get('id');
    });

    this.firebaseSvc.getDocument(`users/${this.user_uid}`).then((res) => {
      console.log("res:", res)
      this.user = res;
      this.form.controls.file.setValue(res['photoProfile'])
      this.form.controls.description.setValue(res['description'])
    })
  }

  async submit() {
   
    if (this.form.valid) {
      let path = `users/${this.user_uid}`
      const loading = await this.utilsSvc.loading();
      await loading.present();
      let dataUrl = this.form.value.file;
      if(this.user.photoProfile !== dataUrl){
        let imagePath = `users/${this.user_uid}_photoProfile`;
        let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
        this.form.controls.file.setValue(imageUrl);
      }
      const data = {
        uid: this.user_uid,
        photoProfile: this.form.value.file ? this.form.value.file: this.user.photoProfile,
        description: this.form.value.description ? this.form.value.description : this.user.description,
        name: this.user.name,
        email: this.user.email,
        rol: this.user.rol
      }
      this.firebaseSvc.setDocument(path,data).then(async res => {

        this.utilsSvc.presentToast({
          message: 'informacion actualizada con exito!',
          duration: 2500,
          color: 'success',
          position: 'bottom',
          icon: 'checkmark-circle-outline',
        });

        loading.dismiss()
        const navigationExtras: NavigationExtras = {
          queryParams: {
            refresh: new Date().getTime()
          },
         
        };
        location.reload();
      })
    }
  }

  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Foto de perfil')).dataUrl;
    this.form.controls.file.setValue(dataUrl);

  }

}
