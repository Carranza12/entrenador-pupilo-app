import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./home/home.module').then((m) => m.HomePageModule),
          },
        ],
      },
      {
        path: 'teams',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./teams/teams.module').then((m) => m.TeamsPageModule),
          },
        ],
      },
      {
        path: 'planning',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./planning/planning.module').then(
                (m) => m.PlanningPageModule
              ),
          },
        ],
      },

      {
        path: 'activities',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./activities/activities.module').then(
                (m) => m.ActivitiesPageModule
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'profile',

    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
