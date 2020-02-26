import { Component, OnInit } from '@angular/core';

import * as mdc from 'material-components-web';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';

@Component({
  selector: 'footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss']
})
export class FooterBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
