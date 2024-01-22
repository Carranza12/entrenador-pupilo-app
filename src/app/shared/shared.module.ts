import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, CustomInputComponent, LogoComponent, SidebarComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [HeaderComponent, CustomInputComponent, LogoComponent, ReactiveFormsModule, SidebarComponent],
})
export class SharedModule {}
