import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  teams:any = [];
  user:any;
  teamsEmptyMessage:string;
  utilsSvc = inject(UtilsService)

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage("user")
    console.log("user:", this.user)
    if(this.user.rol === "entrenador"){
      this.teamsEmptyMessage = "Aun no tienes equipos creados, pulsa en el icono de '+' para crear uno"
    }
    if(this.user.rol === "pupilo"){
      this.teamsEmptyMessage = "Aun no te unes a ningun equipo, pulsa en el icono de '+' para unirte a uno"
    }
  }

  openTeam() {
    if(this.user.rol === "entrenador"){
      console.log("vas a la vista donde puedes crear equipos")
      this.utilsSvc.routerLink('/main/teams/create')
    }
    if(this.user.rol === "pupilo"){
      console.log("vas a la vista donde puedes unierte a un equipo")
    }
  }
}
