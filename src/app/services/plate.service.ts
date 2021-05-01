import { UserService } from './user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlateService {
  public proteins: any;
  public vegetables: any;
  public fruits: any;
  public cereals: any;
  public randomPlate: any;
  public user: any;

  isFavorite = false;

  constructor(
    private db: AngularFireDatabase,
    private userService: UserService
  ) {
    this.user = this.userService.getUser();
    this.getDBIngredients();
  }

  getDBIngredients = () => {
    this.db.database
      .ref('Ingredientes')
      .get()
      .then((snapshot: any) => {
        //      this.getBannedIngredients();
        // TODO: remove from list of ingredients, the banned ingredients
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

    // this.listenOnChanges();
  };

  // listenOnChanges = () => {
  //   this.db.database
  //     .ref(`users/${this.user.displayName}/prohibidos`)
  //     .on('value', (snapshot: any) => {
  //       const bannedProteins = Object.keys(snapshot.val()).filter(
  //         (ingredient: string) => snapshot.val()[ingredient] === 'protein'
  //       );
  //       console.log('BANNED PROTEINS', bannedProteins);
  //       const bannedVegetables = Object.keys(snapshot.val()).filter(
  //         (ingredient: string) => snapshot.val()[ingredient] === 'vegetable'
  //       );
  //       const bannedFruits = Object.keys(snapshot.val()).filter(
  //         (ingredient: string) => snapshot.val()[ingredient] === 'fruit'
  //       );
  //       const bannedCereals = Object.keys(snapshot.val()).filter(
  //         (ingredient: string) => snapshot.val()[ingredient] === 'cereal'
  //       );

  //       this.proteins = this.proteins.filter((ingredient: string) => {
  //         console.log('ingrediente de this.proteins', ingredient);
  //         return bannedProteins.map(e => {
  //           console.log('ingrediente de banned', e);
  //           return ingredient !== e;
  //         });
  //       });
  //       console.log('PROTEINAS ACTUALIZADAS', this.proteins);
  //     });
  // };

  getRandomIngredient = (category: string): string => {
    this.getDBIngredients();
    console.log(category);
    let familyOfIngredients: any;
    switch (category) {
      case 'protein':
        familyOfIngredients = this.proteins;
        break;
      case 'vegetable':
        familyOfIngredients = this.vegetables;
        break;
      case 'fruit':
        familyOfIngredients = this.fruits;
        break;
      case 'cereal':
        familyOfIngredients = this.cereals;
    }
    console.log('familyOfIngredients', familyOfIngredients);
    const randomItem =
      familyOfIngredients[
        Math.floor(Math.random() * familyOfIngredients.length)
      ];
    return randomItem;
  };

  public getRandomPlate = async () => {
    const protein = this.getRandomIngredient('protein');
    const cereal = this.getRandomIngredient('cereal');
    const fruit = this.getRandomIngredient('fruit');
    const vegetable = this.getRandomIngredient('vegetable');
    this.randomPlate = {
      protein: protein,
      cereal: cereal,
      fruit: fruit,
      vegetable: vegetable
    };
    this.isFavorite = await this.userService.getIsFavorite(this.randomPlate);
    return this.randomPlate;
  };

  createMenu = async () => {
    const menu = [];
    for (let i = 0; i < 7; i++) {
      const plate = await this.getRandomPlate();
      menu.push(plate);
    }
    console.log('menu', menu);
    this.db.database.ref(`users/${this.user.displayName}/menu`).set(menu);
    return menu;
  };
}
