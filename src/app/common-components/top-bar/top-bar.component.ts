import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

import * as mdc from 'material-components-web';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { $ } from 'protractor';

@Component({
  selector: 'site-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  gdgbaguio_logo = '../../assets/images/gdgbaguio-logo.png';

  constructor(public auth: AuthenticationService) { }

  ngOnInit() { }

  initializeMDCcomponents() {
    /** Initialize MDC Web components. */
    // Instantiation
    const topAppBarElement = document.querySelector('#site-top-bar');
    const topAppBar = new MDCTopAppBar(topAppBarElement);

    // const rootEl = document.querySelector('.root');
    const communityLink = document.querySelector('#community-menu-surface-link');
    const communityLinkIcon = document.querySelector('#community-menu-surface-icon');
    const menuEl = document.querySelector('#community-mdc-menu');
    const menu = new mdc.menu.MDCMenu(menuEl);
    communityLink.addEventListener('mouseover', (event) => {
      menu.open = !menu.open;
      menu.setAnchorCorner(mdc.menu.Corner.BOTTOM_LEFT);
      menu.setAnchorElement(communityLink);
    });

    const accountButton = document.getElementById('account-button');
    console.log(accountButton);

    const accountMenu = document.getElementById('account-mdc-menu');
    console.log(accountMenu);

    const menu2 = new mdc.menu.MDCMenu(accountMenu);
    accountButton.addEventListener('click', (event) => {
      console.log('Account button click');

      menu2.open = !menu2.open;
      menu2.setAnchorCorner(mdc.menu.Corner.BOTTOM_LEFT);
      menu2.setAnchorElement(accountButton);
    });

    // TEXT FIELDS
    const textFields = Array.from(document.querySelectorAll('.mdc-text-field'));
    for (const textField of textFields) {
      MDCTextField.attachTo(textField);
    }

    // BUTTONS
    // const buttons = Array.from(document.querySelectorAll('.mdc-button'));
    // for (const button of buttons) {
    //   MDCRipple.attachTo(button);
    // }

    // const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
    // iconButtonRipple.unbounded = true;

    const selector = '.mdc-card__primary-action, .mdc-list-item';
    const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
      return new MDCRipple(el);
    });

    // const surface = document.querySelector('.my-surface');
    // const ripple = new MDCRipple(surface);

    // // /** Custom javascript code. */
    // const greetMessageEl = document.querySelector('.greet-message');
    // const greetButton = document.querySelector('.greet-button');
    // greetButton.addEventListener('click', () => {
    //   const firstNameInput = (<HTMLInputElement>document.querySelector('.first-name-input')).value;
    //   const lastNameInput = (<HTMLInputElement>document.querySelector('.last-name-input')).value;
    //   let name;
    //   if (firstNameInput || lastNameInput) {
    //     name = firstNameInput + ' ' + lastNameInput;
    //   } else {
    //     name = 'Anonymous';
    //   }
    //   greetMessageEl.textContent = `Hello, ${name}!`;
    // });
  }



}
