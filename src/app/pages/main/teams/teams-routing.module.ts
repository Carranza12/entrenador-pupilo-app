import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamsPage } from './teams.page';

const routes: Routes = [
  {
    path: '',
    component: TeamsPage,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create-team/create-team.module').then(
        (m) => m.CreateTeamPageModule
      ),
  },
  {
    path: 'join',
    loadChildren: () =>
      import('./join-team/join-team.module').then((m) => m.JoinTeamPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsPageRoutingModule {}
