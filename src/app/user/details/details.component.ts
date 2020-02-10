import { Component, OnInit, Input } from '@angular/core';

import { UserService } from 'src/app/core/services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() user: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  updateActive(isActive: boolean) {
    this.userService
    .updateUser(this.user.key, { active: isActive})
    .catch(err => console.log(err));
  }

  deleteUser() {
    this.userService
    .deleteUser(this.user.key)
    .catch(err => console.log(err));
  }
}