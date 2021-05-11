import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faHeart as regularFaHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faBan,
  faHeart as solidFaHeart
} from '@fortawesome/free-solid-svg-icons';
import { PlateService } from 'src/app/services/plate.service';
import { UserService } from 'src/app/services/user.service';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-plate-generator',
  templateUrl: './plate-generator.component.html',
  styleUrls: ['./plate-generator.component.scss']
})
export class PlateGeneratorComponent implements OnInit {
  isFavorite = false;
  modalSelectedData!: string;

  // public randomFruit: any;
  // public randomProtein: any;
  public menu: any[] = [];
  // public favorite = false;
  public user: any;
  public randomPlate: any;
  public ingredients: any;

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
    console.log('INGREDIENTS', this.ingredients);
  }

  ngOnInit(): void {}

  getDBIngredients = async () => {
    const ingredients = await this.plateService.getDBIngredients();
    this.ingredients = ingredients;
    console.log('ingredients', ingredients);
    return ingredients;
  };

  public getRandomIngredient = (category: string) => {
    return this.plateService.getRandomIngredient(category);
  };

  public getRandomPlate = async () => {
    this.randomPlate = await this.plateService.getRandomPlate();
    console.log('2ND CALL TO ISFAVORITE');

    this.isFavorite = await this.userService.getIsFavorite(this.randomPlate);
  };

  public addIngredient = (ingredient: string, type: string) => {
    console.log('INGREDIENT', ingredient);
    console.log('TYPE', type);
    this.db.database
      .ref('Ingredientes')
      .child(ingredient)
      .set(type);
  };

  public saveAsFav = async () => {
    console.log('SAVE AS FAV');
    this.userService.saveAsFav(this.randomPlate);
    this.isFavorite = true;
  };

  public deleteFav = async () => {
    this.userService.deleteFav(this.randomPlate);
    this.isFavorite = false;
  };

  // Añadir en algún sitio la lista de prohibidos para poder volver a añadirlos

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
  };

  public modifyIngredient = (event: any, category: string) => {
    console.log(event.target.value);
    this.randomPlate[category] = event.target.value;
  };

  openDialog = (data: any, category: string) => {
    console.log('DATA TO SHOW', data);
    const dialogRef = this.dialog.open(ModalContentComponent, {
      data: { dataset: data, selectedData: this.modalSelectedData }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.modalSelectedData = result;
      this.randomPlate[category] = result;

      console.log(`Dialog result: ${result}`);
    });
  };
}
