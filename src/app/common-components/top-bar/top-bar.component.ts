import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

import * as mdc from 'material-components-web';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';

@Component({
  selector: 'site-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  gdgbaguio_logo = '../../assets/images/gdgbaguio-logo.png';
  // showSignInbutton: boolean;
  // c: any;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.initializeMDCcomponents()
  }

  initializeMDCcomponents() {
    window.onload = () => {
      /** Initialize MDC Web components. */
      // Instantiation
      // RIPPLE
      const selector = '.mdc-button, .mdc-list-item, .mdc-card__primary-action';
      const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
        return new MDCRipple(el);
      });
      // console.log('RIPPLES', ripples);

      const topAppBarElement = document.querySelector('#site-top-bar');
      const topAppBar = new MDCTopAppBar(topAppBarElement);
      // console.log('TOPBAR', topAppBar);

      // ACCOUNT ICON BUTTON
      const htmlElementTypeSelector = new MDCRipple(<HTMLButtonElement>document.querySelector('.mdc-button'));
      console.log('SIGNIN', htmlElementTypeSelector);

      const accountIconButton = <HTMLButtonElement>document.querySelector('#account-button');
      console.log('ACCOUNT ICON BUTTON', accountIconButton);
      const accountMenu = <HTMLDivElement>document.querySelector('#account-mdc-menu');
      console.log('ACCOUNT DIV', accountMenu);
      const accounMDCMenu = new mdc.menu.MDCMenu(accountMenu);
      accountIconButton.addEventListener('click', (event) => {
        accounMDCMenu.open = !accounMDCMenu.open;
        accounMDCMenu.setAnchorCorner(mdc.menu.Corner.BOTTOM_LEFT);
        accounMDCMenu.setAnchorElement(accountIconButton);
      });

      // TEXT FIELDS
      const textFields = Array.from(document.querySelectorAll('.mdc-text-field'));
      // console.log('TEXT FIELDS SELECTOR', textFields);
      for (const textField of textFields) {
        new MDCTextField(textField);
      }

      // const rootEl = document.querySelector('.root');
      const communityLink = document.querySelector('#community-menu-surface-link');
      const menuEl = document.querySelector('#community-mdc-menu');
      // const menu = new MDCMenu(menuEl);
      // communityLink.addEventListener('mouseover', (event) => {
      //   menu.open = !menu.open;
      //   menu.setAnchorCorner(mdc.menu.Corner.BOTTOM_LEFT);
      //   menu.setAnchorElement(communityLink);
      // });





      // const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
      // iconButtonRipple.unbounded = true;

      // const surface = document.querySelector('.my-surface');
      // const ripple = new MDCRipple(surface);

      /** Custom javascript code. */
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

}
