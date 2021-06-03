import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Plate } from '../models/plate';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User;
  public isFavorite!: boolean;
  public favorites: any;

  constructor(private db: AngularFireDatabase) {
    this.user = this.getUser();
  }

  getUser = (): User => {
    const data = localStorage.getItem('user') as string;
    const userData = JSON.parse(data);
    this.user = userData;
    return userData;
  };

  getFavorites = async () => {
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/favoritos`)
      .get();

    if (snapshot.val()) {
      this.favorites = snapshot.val();
    } else {
      this.favorites = null;
    }
    return this.favorites;
  };

  getBannedIngredients = async () => {
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/prohibidos/`)
      .get();

    if (snapshot.val()) {
      return snapshot.val();
    }
  };

  getLength = async (element: string) => {
    let length = 0;

    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}`)
      .get();

    if (snapshot.val()[element]) {
      length = snapshot.val()[element].length;
    }
    return length;
  };

  getIsFavorite = async (randomPlate: any) => {
    let isFavorite = false;
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/favoritos`)
      .get();

    if (snapshot.val()) {
      isFavorite = snapshot.val().find((plate: any) => {
        return (
          plate.cereal === randomPlate.cereal &&
          plate.protein === randomPlate.protein &&
          plate.vegetable === randomPlate.vegetable &&
          plate.fruit === randomPlate.fruit
        );
      })
        ? true
        : false;
    } else {
      isFavorite = false;
    }
    return isFavorite;
  };

  saveAsFav = async (plate: Plate) => {
    const favoritesLength = await this.getLength('favoritos');
    plate.isFavorite = true;
    this.db.database
      .ref(`users/${this.user.displayName}/favoritos/${favoritesLength}`)
      .set(plate);

    this.isFavorite = true;
    this.favorites = this.getFavorites();
  };

  deleteFav = async (plate: any) => {
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/favoritos/`)
      .get();

    if (snapshot.val()) {
      const favorites = snapshot.val();
      const index = favorites.findIndex(
        (favPlate: Plate) =>
          favPlate.protein === plate.protein &&
          favPlate.cereal === plate.cereal &&
          favPlate.fruit === plate.fruit &&
          favPlate.vegetable === plate.vegetable
      );
      favorites.splice(index, 1);

      this.db.database
        .ref(`users/${this.user.displayName}/favoritos`)
        .set(favorites);
    }
    this.isFavorite = false;
    this.favorites = this.getFavorites();
  };

  banIngredient = async (ingredient: string, category: string) => {
    this.db.database
      .ref(`users/${this.user.displayName}/prohibidos/${ingredient}`)
      .set(category);
  };

  allowIngredient = (ingredient: string) => {
    this.db.database
      .ref(`users/${this.user.displayName}/prohibidos/${ingredient}`)
      .remove();
  };

  getUserMenu = async () => {
    let menu = null;
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/menu`)
      .get();

    if (snapshot.val()) {
      menu = snapshot.val();
    }
    return menu;
  };

  getShoppingList = async () => {
    let shoppingList = null;
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/shoppingList`)
      .get();
    if (snapshot.val()) {
      shoppingList = snapshot.val();
    }
    return shoppingList;
  };

  removeFromShoppingList = async (ingredient: string) => {
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/shoppingList/`)
      .get();

    if (snapshot.val()) {
      const shoppingList = snapshot.val();
      const index = shoppingList.indexOf(ingredient);
      shoppingList.splice(index, 1);

      this.db.database
        .ref(`users/${this.user.displayName}/shoppingList`)
        .set(shoppingList);
    }
  };
}
