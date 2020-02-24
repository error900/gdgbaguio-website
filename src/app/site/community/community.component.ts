import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'site-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  community_loop = '../../assets/community_loop.mp4';
  constructor() { }

  ngOnInit() {
  }

}
