import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { MDCLinearProgress } from '@material/linear-progress';
import { MeetupAuthService } from './core/services/meetup-auth.service';
import { AuthenticationService } from './core/services/authentication.service';
import { User } from './core/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSiteTopBar = true;
  showFooter = true;
  url: any;
  linearProgress: any;
  currentUser: User;

  constructor(private router: Router, private meetupOAuth: MeetupAuthService, public auth: AuthenticationService) {
    // console.log(route.pathFromRoot[1].snapshot.url[0].path);
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.url = event.url;
          console.log('ROUTE', this.url)
        }
        this.setOAuthToken();
        if (this.url.search('dashboard') == -1) {
          this.showSiteTopBar = true;
          this.showFooter = true;
        } else {
          this.showSiteTopBar = false;
          this.showFooter = false;
        }
        if (this.url.search('login') == 1) {
          this.showSiteTopBar = false;
          this.showFooter = false;
        }
        if (this.url.search('community') == 1) {
          this.showFooter = false;
        }
        if ((this.url.search('application') == 1 && this.url.search('sponsor') == -1) && (this.url.search('application') == 1 && this.url.search('speaker') == -1) && (this.url.search('application') == 1 && this.url.search('volunteer') == -1) && (this.url.search('application') == 1 && this.url.search('wtm') == -1)) {
          this.router.navigate(['error404']);
        }
      }
    );
  }

  ngOnInit(): void {
    this.linearProgress = new MDCLinearProgress(document.querySelector('.mdc-linear-progress'));
    this.progressBar();
  }

  setOAuthToken() {
    if (this.url.search('oauth') == 1) {
      if (sessionStorage['access_token'] == null) {
        this.auth.user$.subscribe(
          currentUser => {
            this.currentUser = currentUser;
            this.meetupOAuth.updateUserMeetupSignin(this.currentUser.uid);
            
          }
        );
      }
      this.showSiteTopBar = false;
      this.showFooter = false;
    }
  }

  progressBar() {
    window.document.addEventListener('readystatechange', event => {
      console.log('event.target.readyState', event.target.readyState);
      if (event.target.readyState === 'interactive') {
        this.linearProgress.open();
      } else if (event.target.readyState === 'complete') {
        this.linearProgress.close();
      }
    });
  }
}