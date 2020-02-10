import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { User } from '../user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user: User = new User();
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    this.userService.createUser(this.user);
    this.user = new User();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
