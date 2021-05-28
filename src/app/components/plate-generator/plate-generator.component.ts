import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faHeart as regularFaHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faBan,
  faHeart as solidFaHeart
} from '@fortawesome/free-solid-svg-icons';
import { Ingredients } from 'src/app/models/ingredients';
import { Plate } from 'src/app/models/plate';
import { PlateService } from 'src/app/services/plate.service';
import { UserService } from 'src/app/services/user.service';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { User } from './../../models/user';

@Component({
  selector: 'app-plate-generator',
  templateUrl: './plate-generator.component.html',
  styleUrls: ['./plate-generator.component.scss']
})
export class PlateGeneratorComponent implements OnInit {
  isFavorite = false;
  modalSelectedData!: string;
  public menu: Plate[] = [];
  public user!: User;
  public randomPlate!: any; // Plate;
  public ingredients!: Ingredients;

  public solidFaHeart = solidFaHeart;
  public regularFaHeart = regularFaHeart;
  public faBan = faBan;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private userService: UserService,
    private plateService: PlateService,
    public dialog: MatDialog
  ) {
    // ----GET USER----
    this.user = this.userService.getUser();

    if (!this.user) {
      this.router.navigate(['/login']);
    }
    // ------GET INGREDIENTS FROM DB------
    this.getDBIngredients();
  }

  ngOnInit(): void {}

  getDBIngredients = async () => {
    const ingredients = await this.plateService.getDBIngredients();
    this.ingredients = ingredients;
    return ingredients;
  };

  public getRandomIngredient = (category: string) => {
    return this.plateService.getRandomIngredient(category);
  };

  public getRandomPlate = async () => {
    this.randomPlate = await this.plateService.getRandomPlate();
    this.isFavorite = await this.userService.getIsFavorite(this.randomPlate);
  };

  public addIngredient = (ingredient: string, type: string) => {
    this.db.database
      .ref('Ingredientes')
      .child(ingredient)
      .set(type);
  };

  public saveAsFav = async () => {
    this.userService.saveAsFav(this.randomPlate);
    this.isFavorite = true;
  };

  public deleteFav = async () => {
    if (confirm('¿Seguro que quieres eliminarlo de favoritos?')) {
      this.userService.deleteFav(this.randomPlate);
      this.isFavorite = false;
    }
  };

  public banIngredient = async (ingredient: string, category: string) => {
    this.userService.banIngredient(ingredient, category);
    this.plateService
      .updateIngredientsLists()
      .then(
        async () =>
          (this.randomPlate[category] = await this.getRandomIngredient(
            category
          ))
      );
    this.isFavorite = false;
  };

  openDialog = (data: any, category: string) => {
    const dialogRef = this.dialog.open(ModalContentComponent, {
      data: { dataset: data, selectedData: this.modalSelectedData }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.modalSelectedData = result;
      this.randomPlate[category] = result;
    });
    this.isFavorite = false;
  };
}
