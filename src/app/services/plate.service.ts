import { UserService } from './user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Plate } from '../models/plate';

@Injectable({
  providedIn: 'root'
})
export class PlateService {
  public proteins!: string[];
  public vegetables!: string[];
  public fruits!: string[];
  public cereals!: string[];
  public filteredProteins!: string[];
  public filteredVegetables!: string[];
  public filteredFruits!: string[];
  public filteredCereals!: string[];

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

  getDBIngredients = async () => {
    const snapshot = await this.db.database.ref('Ingredientes').get();

    if (snapshot.val()) {
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
    }
    await this.updateIngredientsLists();

    return {
      proteins: this.proteins,
      vegetables: this.vegetables,
      cereals: this.cereals,
      fruits: this.fruits
    };
  };

  updateIngredientsLists = async (): Promise<any> => {
    let filteredIngredients = null;

    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/prohibidos/`)
      .get();

    if (snapshot.val()) {
      const bannedProteins = Object.keys(snapshot.val()).filter(
        (ingredient: string) => snapshot.val()[ingredient] === 'protein'
      );
      const bannedCereals = Object.keys(snapshot.val()).filter(
        (ingredient: string) => snapshot.val()[ingredient] === 'cereal'
      );
      const bannedFruits = Object.keys(snapshot.val()).filter(
        (ingredient: string) => snapshot.val()[ingredient] === 'fruit'
      );
      const bannedVegetables = Object.keys(snapshot.val()).filter(
        (ingredient: string) => snapshot.val()[ingredient] === 'vegetable'
      );

      const filteredProteins = this.proteins.filter(
        ingredient => !bannedProteins.includes(ingredient)
      );
      const filteredCereals = this.cereals.filter(
        ingredient => !bannedCereals.includes(ingredient)
      );
      const filteredFruits = this.fruits.filter(
        ingredient => !bannedFruits.includes(ingredient)
      );
      const filteredVegetables = this.vegetables.filter(
        ingredient => !bannedVegetables.includes(ingredient)
      );

      this.filteredProteins = filteredProteins;
      this.filteredCereals = filteredCereals;
      this.filteredVegetables = filteredVegetables;
      this.filteredFruits = filteredFruits;

      console.log('FINAL PROTEINS', this.filteredProteins);
      console.log('FINAL VEGETABLES', this.filteredVegetables);
      console.log('FINAL CEREALS', this.filteredCereals);
      console.log('FINAL FRUITS', this.filteredFruits);

      filteredIngredients = {
        proteins: filteredProteins,
        cereals: filteredCereals,
        fruits: filteredFruits,
        vegetables: filteredVegetables
      };
    } else {
      // There are no banned ingredients
      this.filteredProteins = this.proteins;
      this.filteredCereals = this.cereals;
      this.filteredVegetables = this.vegetables;
      this.filteredFruits = this.fruits;

      filteredIngredients = {
        proteins: this.proteins,
        cereals: this.cereals,
        fruits: this.fruits,
        vegetables: this.vegetables
      };
    }

    return filteredIngredients;
  };

  getRandomIngredient = async (category: string) => {
    // if (!this.proteins || !this.cereals || !this.fruits || !this.vegetables) {
    //   await this.getDBIngredients();
    // }

    let familyOfIngredients: any;
    switch (category) {
      case 'protein':
        familyOfIngredients = this.filteredProteins;
        break;
      case 'vegetable':
        familyOfIngredients = this.filteredVegetables;
        break;
      case 'fruit':
        familyOfIngredients = this.filteredFruits;
        break;
      case 'cereal':
        familyOfIngredients = this.filteredCereals;
    }
    const randomItem =
      familyOfIngredients[
        Math.floor(Math.random() * familyOfIngredients.length)
      ];
    return randomItem;
  };

  public getRandomPlate = async () => {
    const protein = await this.getRandomIngredient('protein');
    const cereal = await this.getRandomIngredient('cereal');
    const fruit = await this.getRandomIngredient('fruit');
    const vegetable = await this.getRandomIngredient('vegetable');
    const isFavorite = await this.userService.getIsFavorite({
      protein: protein,
      cereal: cereal,
      fruit: fruit,
      vegetable: vegetable
    });

    this.randomPlate = {
      protein: protein,
      cereal: cereal,
      fruit: fruit,
      vegetable: vegetable,
      isFavorite: isFavorite
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
    this.db.database.ref(`users/${this.user.displayName}/menu`).set(menu);
    return menu;
  };
}
