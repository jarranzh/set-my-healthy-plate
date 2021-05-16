import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuOpen = false;
  public user!: User;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  public logOut = () => {
    this.authService.logOut();
  };

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}
