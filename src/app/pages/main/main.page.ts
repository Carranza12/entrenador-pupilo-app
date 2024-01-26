import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  user!:any;
  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
  }

  signOut() {
    this.firebaseSvc.signOut();
  }
}
