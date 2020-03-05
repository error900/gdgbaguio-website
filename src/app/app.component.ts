import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSiteTopBar = true;
  showFooter = true;
  url: any;

  constructor(private router: Router) {
    // console.log(route.pathFromRoot[1].snapshot.url[0].path);
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.url = event.url
          console.log('ROUTE', this.url)
        }
        if (this.url.search('dashboard') == -1) {
          this.showSiteTopBar = true;
          this.showFooter = true;
        } else {
          this.showSiteTopBar = false;
          this.showFooter = false;
        }
        if (this.url.search('community') == 1) {
          this.showFooter = false;
        }
      }
    );
  }

  ngOnInit(): void { }
}