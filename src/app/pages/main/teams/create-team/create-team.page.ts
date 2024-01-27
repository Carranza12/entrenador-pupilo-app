import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { SelectOption } from 'src/app/models/select.model';
import { CodegeneratorService } from 'src/app/services/codegenerator.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {
  teamTypesOptions: SelectOption[] = [];
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  user: any;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    img: new FormControl(''),
  });

  messagesTeamType = [
    {
      type: 'publico',
      message:
        "El equipo que sea 'publico' aparecera en el cuadro de busqueda y cualquier usuario podra solicitar unirse",
    },
    {
      type: 'privado',
      message:
        "El equipo que sea 'privado' solo podra unirse el usuario que tenga el codigo que le compartas",
    },
  ];

  constructor(private _codeGenerator: CodegeneratorService) {}

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    console.log('USUARIO:', this.user);
    this.teamTypesOptions = this.utilsSvc.getTeamTypesOptions();

    this.form.controls.type.valueChanges.subscribe((value) => {
      const findMTT = this.messagesTeamType.find((mtt) => mtt.type === value);
      if (findMTT) {
        this.utilsSvc.presentToast({
          message: findMTT.message,
          duration: 5000,
          color: 'dark',
          position: 'bottom',
          icon: 'info',
        });
      }
    });
  }

  async submit() {
    if (this.form.valid) {
      const code = this._codeGenerator.generateCode();

      let path = `teams/${code}`;
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let dataUrl = this.form.value.img;
      let imagePath = `teams/${code}`;
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);

      let data: any = {
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        type: this.form.controls.type.value,
        members: [],
        administrators: [this.user.uid],
        creator: this.user.uid,
        img: imageUrl,
        id: code,
      };
      this.firebaseSvc.setDocument(path, data).then(async (res) => {
        this.utilsSvc.presentToast({
          message: 'Equipo creado con exito!',
          duration: 2500,
          color: 'success',
          position: 'bottom',
          icon: 'checkmark-circle-outline',
        });

        loading.dismiss();
      });
    }
  }

  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Foto de perfil')).dataUrl;
    this.form.controls.img.setValue(dataUrl);
  }
}
