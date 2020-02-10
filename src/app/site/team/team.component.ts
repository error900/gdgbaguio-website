import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  van_photo = '../assets/images/team/van.jpg';
  kim_photo = '../assets/images/team/kim.jpg';
  macs_photo = '../assets/images/team/macs.jpg';
  janine_photo = '../assets/images/team/janine.jpg';
  karl_photo = '../assets/images/team/karl.jpg';
  vj_photo = '../assets/images/team/vj.jpg';
  yanyan_photo = '../assets/images/team/yanyan.jpg';
  clint_photo = '../assets/images/team/clint.jpg';
  clifford_photo = '../assets/images/team/clifford.jpg';
  jude_photo = '../assets/images/team/jude.jpg';
  
  placeholder = '../assets/images/activities/google-codelabs.png';
  
  constructor() { }

  ngOnInit() {
  }

}
