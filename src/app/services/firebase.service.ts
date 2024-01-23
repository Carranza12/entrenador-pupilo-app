import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ref } from '@angular/fire/storage';
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';
import { updateDoc } from 'firebase/firestore';
import { Observable, finalize } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  utilsSvc = inject(UtilsService);

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  getAuth() {
    return getAuth();
  }

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }

  updateProfile(file: File, user_uid: string, form:any): Observable<any> {
    console.log("FORM:", form)
    const filePath = `users/${user_uid}_photoProfile`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    uploadTask.percentageChanges().subscribe((percentage) => {
      console.log(`Uploaded: ${percentage}%`);
    });
    return uploadTask.snapshotChanges().pipe(
      finalize(async () => {
        const downloadURL = await fileRef.getDownloadURL().toPromise();

        const loading = await this.utilsSvc.loading();
        loading.present();
        let path = `users/${user_uid}`;
      
          await this.updateDocument(path, { photoProfile: downloadURL, description: form.description})
            .then((res) => {
              this.utilsSvc.routerLink('/main/profile');
              
            })
            .catch((error) => {
              console.log(error);
              this.utilsSvc.presentToast({
                message: error.message,
                duration: 2500,
                color: 'danger',
                position: 'bottom',
                icon: 'alert-circle-outline',
              });
            })
            .finally(() => {
              loading.dismiss();
            });
       
      })
    );
  }
}
