import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { AuthenticationService } from './core/services/authentication.service';
import { User } from './core/model/user.model';
import { MeetupAuthService } from './core/services/meetup-auth.service';
import { oauthResponse } from 'src/app/core/model/meetup-oauth2.model';

import { MDCLinearProgress } from '@material/linear-progress';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSiteTopBar: boolean;
  showDashboardTopBar: boolean;
  showFooter: boolean;
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
          this.showDashboardTopBar = false;
        } else {
          this.showSiteTopBar = false;
          this.showFooter = false;
          this.showDashboardTopBar = true;
        }

        if (this.url.search('login') == 1) {
          this.showSiteTopBar = false;
          this.showFooter = false;
          this.showDashboardTopBar = false;
        }

        if (this.url.search('community') == 1) {
          this.showFooter = false;
        }

        if (this.url.search('randomizer') == 1) {
          this.showSiteTopBar = false;
          this.showFooter = false;
        }

        

        if (
          (this.url.search('application') == 1 && this.url.search('sponsor') == -1) &&
          (this.url.search('application') == 1 && this.url.search('speaker') == -1) &&
          (this.url.search('application') == 1 && this.url.search('volunteer') == -1) &&
          (this.url.search('application') == 1 && this.url.search('wtm') == -1) &&
          (this.url.search('application') == 1 && this.url.search('error') == -1)
        ) {
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
    if (this.url.search('oauth') === 1) {
      if (localStorage.getItem('access_token') === null) {
        this.auth.user$.subscribe(
          currentUser => {
            this.currentUser = currentUser;
            let params = {} as oauthResponse;
            var hash = window.location.hash.substring(1);
            var prop = hash.split('&');
            for (var i = 0; i < prop.length; i++) {
              var pair = prop[i].split('=');
              params[pair[0]] = decodeURIComponent(pair[1]);
            }
            console.log(params);
            localStorage.setItem('access_token', params.access_token)
            this.meetupOAuth.updateAdminUserMeetupSignin(this.currentUser.uid);
            this.router.navigate(['/dashboard/meetup-events']);
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