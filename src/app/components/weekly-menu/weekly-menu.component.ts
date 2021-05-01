import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { PlateService } from 'src/app/services/plate.service';

@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrls: ['./weekly-menu.component.scss']
})
export class WeeklyMenuComponent implements OnInit {
  public menu: any;
  constructor(
    private userService: UserService,
    private plateService: PlateService
  ) {}

  ngOnInit(): void {
    this.getUserMenu();
  }

  getUserMenu = async () => {
    this.menu = await this.userService.getUserMenu();
    console.log('MENU', this.menu);
  };

  public createMenu = async () => {
    this.menu = await this.plateService.createMenu();
  };
}
