import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularFaHeart } from '@fortawesome/free-regular-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-plate-generator',
  templateUrl: './plate-generator.component.html',
  styleUrls: ['./plate-generator.component.scss']
})
export class PlateGeneratorComponent implements OnInit {
  isFavorite = false;
  public proteins: any;
  public vegetables: any;
  public fruits: any;
  public cereals: any;
  public randomFruit: any;
  public randomProtein: any;
  public menu: any[] = [];
  public favorite = false;
  public user: any;
  public randomPlate: any;

  public solidFaHeart = solidFaHeart;
  public regularFaHeart = regularFaHeart;
  public faBan = faBan;

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    // ----GET USER----

    // this.user = userService.getUser();
    // console.log('plate-generator user', this.user);

    this.auth.onAuthStateChanged((user: any) => {
      if (user && user.emailVerified) {
        this.user = user;
        console.log('usuario conectado:', user);
      } else {
        this.user = null;
        console.log('no user connected');
        this.router.navigate(['/login']);
      }
    });
    console.log('plate-generator user', this.user);

    // ------GET INGREDIENTS FROM DB------
    this.db.database
      .ref('Ingredientes')
      .get()
      .then((snapshot: any) => {
        this.proteins = Object.keys(snapshot.val()).filter(
          key => snapshot.val()[key] === 'protein'
        );
        this.vegetables = Object.keys(snapshot.val()).filter(
          key => snapshot.val()[key] === 'vegetable'
        );
        this.fruits = Object.keys(snapshot.val()).filter(
          key => snapshot.val()[key] === 'fruit'
        );
        this.cereals = Object.keys(snapshot.val()).filter(
          key => snapshot.val()[key] === 'cereal'
        );
      });

    //Leer favoritos o prohibidos
    // this.db.database
    //   .ref('users')
    //   .get()
    //   .then((snapshot: any) => {
    //     console.log('prohibidos', snapshot.val().usertest.prohibido);
    //     console.log('favoritos', snapshot.val().usertest.platosFavoritos);
    //   });

    // WRITE IN DATABASE:
    this.db.database
      .ref('users')
      .child('usertest3')
      .child('prohibidos')
      .child('0')
      .set('arroz');

    this.db.database
      .ref('users')
      .child('usertest3')
      .child('prohibidos')
      .child('1')
      .set('manzana');

    //REMOVE:
    this.db.database
      .ref('users')
      .child('usertest2')
      .remove();
  }

  ngOnInit(): void {}

  getLength = async (element: string) => {
    console.log('getLength user', this.user);
    let length = 0;

    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}`)
      .get();

    if (snapshot.val()[element]) {
      length = snapshot.val()[element].length;
      console.log(element, snapshot.val()[element].length);
    }
    return length;
  };

  public getRandomIngredient = (familyOfIngredients: any) => {
    const randomItem =
      familyOfIngredients[
        Math.floor(Math.random() * familyOfIngredients.length)
      ];
    return randomItem;
  };

  public getRandomPlate = async () => {
    const protein = this.getRandomIngredient(this.proteins);
    const cereal = this.getRandomIngredient(this.cereals);
    const fruit = this.getRandomIngredient(this.fruits);
    const vegetable = this.getRandomIngredient(this.vegetables);
    this.randomPlate = {
      protein: protein,
      cereal: cereal,
      fruit: fruit,
      vegetable: vegetable
    };

    this.isFavorite = await this.getIsFavorite();
    return this.randomPlate;
  };

  public getIsFavorite = async () => {
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/favoritos`)
      .get();

    console.log('favorites', snapshot.val());

    const isFavorite = snapshot
      .val()
      .find(
        (plate: any) =>
          plate.cereal === this.randomPlate.cereal &&
          plate.protein === this.randomPlate.protein &&
          plate.vegetable === this.randomPlate.vegetable &&
          plate.fuit === this.randomPlate.fruit
      )
      ? true
      : false;

    return isFavorite;
  };

  public setMenu = () => {
    this.menu = [];
    for (let i = 0; i < 7; i++) {
      const plate = this.getRandomPlate();
      this.menu.push(plate);
    }
    console.log('menu', this.menu);
  };

  public addIngredient = (ingredient: string, type: string) => {
    console.log('INGREDIENT', ingredient);
    console.log('TYPE', type);
    this.db.database
      .ref('Ingredientes')
      .child(ingredient)
      .set(type);
  };

  //Todas estas funciones se podrían meter
  //en el userService?

  public saveAsFav = async () => {
    const favoritesLength = await this.getLength('favoritos');
    this.db.database
      .ref(`users/${this.user.displayName}/favoritos/${favoritesLength}`)
      .set(this.randomPlate);

    this.isFavorite = true;
  };

  public deleteFav = async () => {
    const favoritesLength = await this.getLength('favoritos');

    this.db.database
      .ref(`users/${this.user.displayName}/favoritos/${favoritesLength - 1}`)
      .remove();

    this.isFavorite = false;
  };

  //añadir en algún sitio la lista de prohibidos para poder volver a añadirlos

  public banIngredient = async (ingredient: string, category: string) => {
    console.log('prohibir:', ingredient);
    const bannedLength = await this.getLength('prohibidos');
    this.db.database
      .ref(`users/${this.user.displayName}/prohibidos/${bannedLength}`)
      .set(ingredient);
    // this.randomPlate[category] = this.getRandomIngredient(this[category]);
  };
}
