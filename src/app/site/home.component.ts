import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'site-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  gdg_baguio_banner = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/community-photo/3.jpg';
  activities_img = '../../assets/images/activities/google-codelabs.png';

  android_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Android-01.png';
  angular_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Angular-01.png';
  cloud_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Cloud-01.png';
  firebase_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Firebase-01.png';
  golang_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/GL-01.png';
  gsuite_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/GSuite-01.png';
  kotlin_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Kotlin-01.png';
  md_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/MD-01.png';
  wtm_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/Women Techmakers-01.png';
  cardboard_logo = 'https://raw.githubusercontent.com/error900/gdg-baguio-team/master/google-products/VR-01.png';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() { }

  public sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
