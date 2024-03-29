import { Component, OnInit, inject } from '@angular/core';
import { orderBy, where } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  teams: any = [];
  teamsFiltered:any = [];
  user: any;
  search:FormControl = new FormControl('')
  teamsEmptyMessage: string;
  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');

    if (this.user.rol === 'entrenador') {
      this.teamsEmptyMessage =
        "Aun no tienes equipos creados, pulsa en el icono de '+' para crear uno";
    }
    if (this.user.rol === 'pupilo') {
      this.teamsEmptyMessage =
        "Aun no te unes a ningun equipo, pulsa en el icono de '+' para unirte a uno";
    }

    this.getTeams();

    this.search.valueChanges.subscribe((valor:any) =>{
      if(valor){
        if(this.user.rol === 'entrenador'){
          console.log("buscando...")
          this.teamsFiltered  = this.teams.filter((team:any) => team.name.includes(valor))
          console.log("this.teamsFiltered:", this.teamsFiltered)
        }
      }
      if(!valor){
        if(this.user.rol === 'entrenador'){
          console.log("buscando...")
          this.teamsFiltered  = this.teams
          console.log("this.teamsFiltered:", this.teamsFiltered)
        }
      }
    })
  }

  getTeams() {
    if (this.user.rol === 'entrenador') {
      let query: any = [
        orderBy('name', 'desc'),
        where('creator', '==', this.user.uid),
      ];
      this.firebaseSvc
        .getCollectionData('teams', query)
        .subscribe((res: any) => {
          this.teams = res;
          this.teamsFiltered = this.teams;
        });
    }
  }

  openTeam() {
    if (this.user.rol === 'entrenador') {
      console.log('vas a la vista donde puedes crear equipos');
      this.utilsSvc.routerLink('/main/teams/create');
    }
    if (this.user.rol === 'pupilo') {
      console.log('vas a la vista donde puedes unierte a un equipo');
      this.utilsSvc.routerLink('/main/teams/join')
    }
  }
}
