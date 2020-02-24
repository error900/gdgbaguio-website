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

  constructor(public auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    if (this.auth.user$ != null) {
      this.router.navigate(['/dashboard/meetup-events']);
    } else {
      this.router.navigate(['/login']);
    }

    // TEXT FIELDS
    const textFields = Array.from(document.querySelectorAll('.mdc-text-field'));
    for (const textField of textFields) {
      MDCTextField.attachTo(textField);
    }

    // BUTTONS
    const buttons = Array.from(document.querySelectorAll('.mdc-button'));
    for (const button of buttons) {
      MDCRipple.attachTo(button);
    }
  }

}
