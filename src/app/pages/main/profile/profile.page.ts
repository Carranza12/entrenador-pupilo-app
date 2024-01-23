import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  imagesPreview = [];
  constructor() { }

  ngOnInit() {
    this.imagesPreview = [
      {
        src: "https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/2022-12/running-consejos-principiantes.jpg.webp?itok=Y1qsCYZQ"
      },
      {
        src: "https://images.ecestaticos.com/2RHhvZok-LK_YmQMx_bgkDLva2A=/171x7:2014x1379/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F75f%2F9e9%2F366%2F75f9e936636d81c037dfb51f5be192fb.jpg"
      },
      {
        src: "https://www.sportlife.es/uploads/s1/98/60/29/2/20-razones-para-empezar-a-correr.jpeg"
      },
      {
        src: "../../../../assets/images/no-image-profile-slider.jpg"
      }
    ]
  }

}
