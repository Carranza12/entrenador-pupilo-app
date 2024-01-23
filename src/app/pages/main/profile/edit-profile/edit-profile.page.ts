import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  selectedFile: File | null = null;
  user_uid!: string;
  form = new FormGroup({
    file: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(
    public firebaseSvc: FirebaseService,
    private route: ActivatedRoute,
    public utilsSvc: UtilsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.user_uid = params.get('id');
    });
  }

  submit() {
    console.log('FORM:', this.form.value);
    console.log('this.selectedFile:', this.selectedFile);
    if (this.form.valid) {
      this.upload();
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.selectedFile = file;
      console.log('this.selectedFile:', this.selectedFile.name);
      console.log('FORM:', this.form.value);
    }
  }

  upload() {
    if (this.selectedFile) {
      this.firebaseSvc
        .updateProfile(this.selectedFile, this.user_uid, this.form.value)
        .subscribe(async (downloadURL) => {
       
          if(typeof(downloadURL) !== 'string'){
            console.log("no es un string")
            return;
          }
          console.log('File uploaded successfully. Download URL:', downloadURL);
          console.log("aqui ya es un string, ya puedes subirlo")
         
        });
    } else {
      console.error('No file selected');
    }
  }
}
