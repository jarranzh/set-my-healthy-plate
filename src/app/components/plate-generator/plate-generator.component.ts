import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { faHeart as regularFaHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faBan,
  faHeart as solidFaHeart
} from '@fortawesome/free-solid-svg-icons';
import { PlateService } from 'src/app/services/plate.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-plate-generator',
  templateUrl: './plate-generator.component.html',
  styleUrls: ['./plate-generator.component.scss']
})
export class PlateGeneratorComponent implements OnInit {
  isFavorite = false;
  // public randomFruit: any;
  // public randomProtein: any;
  public menu: any[] = [];
  // public favorite = false;
  public user: any;
  public randomPlate: any;

  public solidFaHeart = solidFaHeart;
  public regularFaHeart = regularFaHeart;
  public faBan = faBan;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private userService: UserService,
    private plateService: PlateService
  ) {
    // ----GET USER----
    this.user = this.userService.getUser();

    if (!this.user) {
      this.router.navigate(['/login']);
    }
    // ------GET INGREDIENTS FROM DB------
    // this.getDBIngredients();

    // WRITE IN DATABASE:
    this.db.database
      .ref('users')
      .child('usertest3')
      .child('prohibidos')
      .child('0')
      .set('arroz');

    // REMOVE:
    this.db.database
      .ref('users')
      .child('usertest2')
      .remove();
  }

  ngOnInit(): void {}

  getDBIngredients = () => {
    this.plateService.getDBIngredients();
  };

  getBannedIngredients = () => {
    this.db.database
      .ref(`users/${this.user.displayName}/prohibidos/`)
      .get()
      .then((snapshot: any) => {
        console.log(snapshot.val());
      });
  };

  public getRandomIngredient = (category: string) => {
    return this.plateService.getRandomIngredient(category);
  };

  public getRandomPlate = async () => {
    this.randomPlate = await this.plateService.getRandomPlate();
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
    this.userService.saveAsFav(this.randomPlate);
    this.isFavorite = true;
  };

  public deleteFav = async () => {
    this.userService.deleteFav(this.randomPlate);
  };

  // Añadir en algún sitio la lista de prohibidos para poder volver a añadirlos

  public banIngredient = async (ingredient: string, category: string) => {
    this.userService.banIngredient(ingredient, category);
    this.randomPlate[category] = this.getRandomIngredient(category);
  };
}
