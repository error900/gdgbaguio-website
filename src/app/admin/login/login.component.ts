import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/model/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'site-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user$: Observable<User>;

  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.accessCheck();
  }

  accessCheck() {
    var user_id = localStorage.getItem('uid');

    if (user_id != null || user_id != undefined) {
      this.auth.checkAdminUser(user_id);
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
