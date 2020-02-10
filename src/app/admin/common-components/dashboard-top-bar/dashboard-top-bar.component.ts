import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

import * as mdc from 'material-components-web';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { MDCDrawer } from '@material/drawer';

@Component({
  selector: 'dashboard-top-bar',
  templateUrl: './dashboard-top-bar.component.html',
  styleUrls: ['./dashboard-top-bar.component.scss']
})
export class DashboardTopBarComponent implements OnInit {

  // constructor(public auth: AuthenticationService) { }
  constructor() { }

  ngOnInit() {
    /** Initialize MDC Web components. */

    // Instantiate MDC Drawer
    const drawerEl = document.querySelector('.mdc-drawer');
    const drawer = MDCDrawer.attachTo(drawerEl);

    // Instantiate MDC Top App Bar (required)
    const topAppBarEl = document.querySelector('#admin-top-app-bar');
    const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(topAppBarEl);

    topAppBar.setScrollTarget(document.querySelector('.main-content'));
    topAppBar.listen('MDCTopAppBar:nav', () => {
      drawer.open = !drawer.open;
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
    // const iconbutton = document.querySelector('.mdc-icon-button');
    // const iconButtonRipple = new MDCRipple(iconbutton);
    // iconButtonRipple.unbounded = true;
    
    // const list = new MDCList(document.querySelector('.mdc-list'));
    // const list_selector = '.mdc-list';
    // const list = [].map.call(document.querySelectorAll(list_selector), function (el) {
    //   return new MDCList(el);
    // });

    const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action, .mdc-list-item';
    const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
      return new MDCRipple(el);
    });
    // const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
  }

  public ripple() {
    const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action, .mdc-list-item';
    const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
      return new MDCRipple(el);
    });
  }

}
