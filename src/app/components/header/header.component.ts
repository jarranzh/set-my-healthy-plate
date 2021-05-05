import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuOpen = false;
  public routeUrl!: string;
  public faHome = faHome;

  constructor(private authService: AuthService) {}

  public logOut = () => {
    this.authService.logOut();
  };

  ngOnInit(): void {}
}
