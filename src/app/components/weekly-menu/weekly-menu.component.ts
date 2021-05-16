import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { PlateService } from 'src/app/services/plate.service';
import { faHeart as regularFaHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';
import { Plate } from 'src/app/models/plate';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrls: ['./weekly-menu.component.scss']
})
export class WeeklyMenuComponent implements OnInit {
  isLoading = false;
  modalSelectedData!: string;
  public menu: any;
  public solidFaHeart = solidFaHeart;
  public regularFaHeart = regularFaHeart;
  public user: any;
  public ingredients: any;

  constructor(
    private userService: UserService,
    private plateService: PlateService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.getUserMenu();
      this.getDBIngredients();
      this.userService.getFavorites();
    }
  }

  getDBIngredients = async () => {
    const ingredients = await this.plateService.getDBIngredients();
    this.ingredients = ingredients;
    return ingredients;
  };

  getUserMenu = async () => {
    this.isLoading = true;
    this.menu = await this.userService.getUserMenu();
    if (this.menu) {
      this.menu.map(
        async (dayMenu: Plate) =>
          (dayMenu.isFavorite = await this.userService.getIsFavorite(dayMenu))
      );
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

  public getRandomIngredient = (category: string) => {
    return this.plateService.getRandomIngredient(category);
  };

  public banIngredient = async (
    ingredient: string,
    category: string,
    index: number
  ) => {
    this.userService.banIngredient(ingredient, category);
    this.plateService
      .updateIngredientsLists()
      .then(
        async () =>
          (this.menu[index][category] = await this.getRandomIngredient(
            category
          ))
      );
    this.menu[index].isFavorite = false;
  };

  openDialog = (data: any, category: string, index: number) => {
    const dialogRef = this.dialog.open(ModalContentComponent, {
      data: { dataset: data, selectedData: this.modalSelectedData }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.modalSelectedData = result;
      if (result !== '') {
        this.menu[index][category] = result;
        this.menu[index].isFavorite = false;
      }
    });
  };
}
