import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Plate } from '../models/plate';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: any;
  public isFavorite!: boolean;
  public favorites: any;

  constructor(private db: AngularFireDatabase) {
    this.user = this.getUser();
    // this.favorites = this.getFavorites();
    // this.favorites = localStorage.getItem('favorites').map(e => JSON.parse(e));
  }

  getUser = () => {
    const data = localStorage.getItem('user') as string;
    const userData = JSON.parse(data);
    this.user = userData;
    return userData;
  };

  getFavorites = async () => {
    // this.favorites = null;
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/favoritos`)
      .get();
    console.log(snapshot.val());

    if (snapshot.val()) {
      console.log('saving favs....');
      this.favorites = snapshot.val();
      console.log(this.favorites);
      localStorage.setItem('favorites', JSON.stringify(snapshot.val()));
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
      console.log(element, snapshot.val()[element].length);
    }
    return length;
  };

  getIsFavorite = async (randomPlate: any) => {
    let isFavorite = false;
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/favoritos`)
      .get();

    if (snapshot.val()) {
      console.log('xxxxxx', snapshot.val());
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
    console.log('isFav', isFavorite);
    return isFavorite;
  };

  saveAsFav = async (plate: Plate) => {
    console.log('--SAVING FAV--', this.user.displayName);
    const favoritesLength = await this.getLength('favoritos');
    console.log('fav length', favoritesLength);
    plate.isFavorite = true;
    this.db.database
      .ref(`users/${this.user.displayName}/favoritos/${favoritesLength}`)
      .set(plate);

    this.isFavorite = true;
    this.favorites = this.getFavorites();
  };

  deleteFav = async (plate: any) => {
    console.log('DELETE FAV');
    const favoritesLength = await this.getLength('favoritos');
    console.log('favoritesLength', favoritesLength);
    console.log('favorites', this.favorites);
    const removePlate = this.favorites.find(
      (favPlate: any) =>
        favPlate.cereal === plate.cereal &&
        favPlate.protein === plate.protein &&
        favPlate.vegetable === plate.vegetable &&
        favPlate.fruit === plate.fruit
    );

    this.db.database
      .ref(
        `users/${this.user.displayName}/favoritos/${this.favorites.indexOf(
          removePlate
        )}`
      )
      .remove();
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
    console.log(snapshot.val());

    if (snapshot.val()) {
      menu = snapshot.val();
    }
    return menu;
  };
}
