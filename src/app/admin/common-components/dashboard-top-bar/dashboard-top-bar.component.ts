import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

import * as mdc from 'material-components-web';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { MDCDrawer } from '@material/drawer';

@Component({
  selector: 'dashboard-top-bar',
  templateUrl: './dashboard-top-bar.component.html',
  styleUrls: ['./dashboard-top-bar.component.scss']
})
export class DashboardTopBarComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.initializeMDCcomponents();
  }

  initializeMDCcomponents() {
    // window.onload = () => {
      /** Initialize MDC Web components. */
      // Instantiation
      // RIPPLE
      const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action, .mdc-list-item';
      const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
        return new MDCRipple(el);
      });

      // Instantiate MDC Drawer
      const drawerEl = document.querySelector('.mdc-drawer');
      console.log('asjfghdsjdag', drawerEl);
      
      const drawer = MDCDrawer.attachTo(drawerEl);

      // Instantiate MDC Top App Bar (required)
      const topAppBarEl = <HTMLDivElement>document.querySelector('#admin-top-app-bar');
      console.log('ASDASGFGFDg', topAppBarEl);
      
      const topAppBar = new MDCTopAppBar(topAppBarEl);

      topAppBar.setScrollTarget(document.querySelector('.main-content'));
      topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
      });

      // ACCOUNT ICON BUTTON
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
      console.log('TEXT FIELDS SELECTOR', textFields);
      for (const textField of textFields) {
        new MDCTextField(textField);
      }
    // }
  }
}
