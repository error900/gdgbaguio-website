import { Component, OnInit } from '@angular/core';

import { FirestoreCovid19Service } from 'src/app/core/services/firestore-covid19.service';

import { MDCSelect } from '@material/select';
import { MDCSelectIcon } from '@material/select/icon';

import * as mdc from 'material-components-web';
import { CasesByCountry } from 'src/app/core/model/covid19.model';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.scss']
})
export class Covid19Component implements OnInit {
  casesByCountry: CasesByCountry[];
  casesByCountry_count = 0;

  constructor(private FirestoreCovid19Service: FirestoreCovid19Service) { }

  ngOnInit(): void {
    // const select = mdc.select.MDCSelect.attachTo(document.querySelector('.mdc-select'));
    // console.log('select', select);

    // select.listen('MDCSelect:change', () => {
    //   alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
    // });

    const select = new MDCSelect(document.querySelector('.mdc-select'));
    const selected_country = <HTMLInputElement>document.getElementById('selected-country');
    console.log('select', select);

    select.listen('MDCSelect:change', () => {
      // alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
      selected_country.value = select.value;
    });

    const icon = new MDCSelectIcon(document.querySelector('.mdc-select__icon'));

    this.getCovidCasesByCountry();

  }

  getCovidCasesByCountry() {
    this.FirestoreCovid19Service.APIFYcovid19CasesWorldwide()
      .subscribe(
        casesByCountry => (
          this.casesByCountry = casesByCountry,
          this.casesByCountry_count = casesByCountry.length,
          console.log('casesByCountry', this.casesByCountry),
          console.log('casesByCountry_count', this.casesByCountry_count)
        )
      );
  }

}
