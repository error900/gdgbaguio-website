import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  copyright_year: string;

  constructor() { }

  ngOnInit(): void {
    this.getYear();
  }

  getYear() {
    this.copyright_year = new Date().getFullYear().toString();
  }
}
