import { Component, OnInit } from '@angular/core';

import * as mdc from 'material-components-web';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';


@Component({
  selector: 'site-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  gdgbaguio_logo = '../../assets/images/gdgbaguio-logo.png';

  constructor() { }

  ngOnInit() {
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

    // communityLink.addEventListener('mouseout', (event) => {
    //   menu.open = !menu.open;
    // });
    // communityLinkIcon.addEventListener('mouseenter', (event) => {
    //   menu.open = !menu.open;
    //   menu.setAnchorCorner(mdc.menu.Corner.BOTTOM_LEFT);
    //   menu.setAnchorElement(communityLinkIcon);
    // });
    // communityLinkIcon.addEventListener('mouseout', (event) => {
    //   menu.open = !menu.open;
    // });
    // buttonEl.addEventListener('mouseout', (event) => {
    //   menuEl.addEventListener('mouseout', (event) => {
    //     menu.open = false;
    //   });
    // });

    const buttonEl2 = document.querySelector('#apps-menu-surface-button');
    const menuEl2 = document.querySelector('#apps-mdc-menu');
    const menu2 = new mdc.menu.MDCMenu(menuEl2);
    buttonEl2.addEventListener('click', (event) => {    
      menu2.open = !menu2.open;
      menu2.setAnchorCorner(mdc.menu.Corner.BOTTOM_LEFT);
      menu2.setAnchorElement(buttonEl2);
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

    const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action, .mdc-list-item';
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
