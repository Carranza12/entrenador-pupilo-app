import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinTeamPageRoutingModule } from './join-team-routing.module';

import { JoinTeamPage } from './join-team.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinTeamPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [JoinTeamPage]
})
export class JoinTeamPageModule {}
