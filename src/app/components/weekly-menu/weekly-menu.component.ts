import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { PlateService } from 'src/app/services/plate.service';
import { faHeart as regularFaHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';
import { Plate } from 'src/app/models/plate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrls: ['./weekly-menu.component.scss']
})
export class WeeklyMenuComponent implements OnInit {
  isLoading = false;
  public menu: any;
  public solidFaHeart = solidFaHeart;
  public regularFaHeart = regularFaHeart;
  public user: any;

  constructor(
    private userService: UserService,
    private plateService: PlateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.getUserMenu();
      this.userService.getFavorites();
    }
  }

  getUserMenu = async () => {
    this.isLoading = true;
    this.menu = await this.userService.getUserMenu();
    if (this.menu) {
      this.menu.map(
        async (dayMenu: Plate) =>
          (dayMenu.isFavorite = await this.userService.getIsFavorite(dayMenu))
      );
      console.log('MENU', this.menu);
    }
    this.isLoading = false;
  };

  public createMenu = async () => {
    this.isLoading = true;
    this.menu = await this.plateService.createMenu();
    this.isLoading = false;
  };

  public saveAsFav = async (plate: any) => {
    this.userService.saveAsFav(plate);
  };

  public deleteFav = async (plate: any, index: number) => {
    this.userService.deleteFav(plate);
    this.menu[index].isFavorite = false;
  };
}
