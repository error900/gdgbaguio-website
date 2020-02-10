import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  gdg_baguio_banner = '../../assets/images/community/3.jpg';
  activities_img = '../../assets/images/activities/google-codelabs.png';

  android_logo =  '../../assets/images/product/Android-01.png';
  angular_logo =  '../../assets/images/product/Angular-01.png';
  cloud_logo =  '../../assets/images/product/Cloud-01.png';
  firebase_logo =  '../../assets/images/product/Firebase-01.png';
  golang_logo =  '../../assets/images/product/GL-01.png';
  gsuite_logo =  '../../assets/images/product/GSuite-01.png';
  kotlin_logo =  '../../assets/images/product/Kotlin-01.png';
  md_logo =  '../../assets/images/product/MD-01.png';
  wtm_logo =  '../../assets/images/product/Women Techmakers-01.png';
  cardboard_logo = '../../assets/images/product/VR-01.png';

  constructor() {}

  ngOnInit() {
  }

}
