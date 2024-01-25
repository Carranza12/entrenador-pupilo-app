import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from 'src/app/models/select.model';
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
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });

  messagesTeamType = [
    {
      type: "publico",
      message: "El equipo que sea 'publico' aparecera en el cuadro de busqueda y cualquier usuario podra solicitar unirse"
    },
    {
      type: "privado",
      message: "El equipo que sea 'privado' solo podra unirse el usuario que tenga el codigo que le compartas"
    }
  ]

  
  constructor() {}

  ngOnInit() {
    this.teamTypesOptions = this.utilsSvc.getTeamTypesOptions();

    this.form.controls.type.valueChanges.subscribe((value) => {
      const findMTT = this.messagesTeamType.find((mtt) => mtt.type === value);
      if(findMTT){
        this.utilsSvc.presentToast({
          message: findMTT.message,
          duration: 5000,
          color: 'dark',
          position: 'bottom',
          icon: 'info'
        });
      }
    })
  }

  submit() {}
}
