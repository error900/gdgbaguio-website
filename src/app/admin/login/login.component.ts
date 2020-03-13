import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/model/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';

@Component({
  selector: 'site-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user$: Observable<User>;
  currentUser

  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.checkAdminUser();
  }

  checkAdminUser() {
    if (this.auth.currentUser != null && this.auth.currentUser.admin == true && this.auth.currentUser.meetupSignin == true) {
      this.router.navigate(['/dashboard/meetup-events']);

    } else {
      this.router.navigate(['/login']);
    }
  }

  resetFields() {
    const email = <HTMLButtonElement>document.querySelector('#email-address-field');
    const password = <HTMLButtonElement>document.querySelector('#password-input');
    email.value = '';
    password.value = '';
  }

}
