import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  disableSiteTopBar = false;
  currentUrl: any;
  r: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private loc: Location) {
    // router.events.subscribe((val) => {
    //   console.log(val instanceof NavigationEnd);
    // });
    // this.activatedRoute.url.subscribe(url => {
    //   console.log('current url - ', url);

    // });

    // router.events.subscribe(val => {
    //   if (location.pathname != "") {
    //     this.r = location.pathname;
    //     console.log(this.r);
    //   } else {
    //     this.r = "Home";
    //     console.log(this.r);
    //   }
    // });
  }

  ngOnInit() {
    // console.log(this.activatedRoute.url);
    // console.log(this.router.url);
    // this.router.events.subscribe((url:any) => console.log(url));
    // console.log(this.router.url);
    // this.currentUrl = this.router.url;
    // console.log(this.currentUrl);
    // console.log('current url - ', this.router.url);
    // console.log('current url - ', window.location.pathname);
  }
}