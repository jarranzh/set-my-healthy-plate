import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuOpen = false;
  public routeUrl!: string;
  public user: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  public logOut = () => {
    this.authService.logOut();
  };

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}
