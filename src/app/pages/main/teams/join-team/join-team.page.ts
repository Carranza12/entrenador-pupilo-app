import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.page.html',
  styleUrls: ['./join-team.page.scss'],
})
export class JoinTeamPage implements OnInit {
  codigoTeam: FormControl = new FormControl('', [Validators.required]);
  constructor(
    public firebase: FirebaseService,
    public utilidades: UtilsService
  ) {}
  user: any;
  async ngOnInit() {
    this.user = this.utilidades.getFromLocalStorage('user');
  }

  async join() {
    const loading = await this.utilidades.loading();
    await loading.present();
    const codigo = this.codigoTeam.value;
    const data = this.firebase.getDocument('teams/' + codigo);
    data.then((res: any) => {
      console.log('res:', res);
      if (!res || res === undefined) {
        console.log('no existe ');
        this.utilidades.presentToast({
          message: 'Equipo no encontrado',
          duration: 1500,
          color: 'error',
          position: 'bottom',
          icon: 'alert',
        });
        loading.dismiss();
      }
      if (res) {
        console.log('equipo:', res);
        const newMembers = [...res.members, this.user.uid];
        this.firebase.updateDocument(`teams/${res.id}`, {...res,members: newMembers}).then((res:any) => {
          this.utilidades.presentToast({
            message: 'Bienvendio al equipo',
            duration: 1500,
            color: 'success',
            position: 'bottom',
            icon: 'happy',
          });
          loading.dismiss();
          this.utilidades.routerLink('/main/teams')
        })
      
      }
    });
  }
}
