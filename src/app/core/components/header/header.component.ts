import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user$: Observable<User>;

  constructor(private userService: UserService) {
    this.user$ = this.userService.getFirstUser();
  }

  ngOnInit(): void {}
}
