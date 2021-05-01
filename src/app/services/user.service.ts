import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: any;
  public isFavorite!: boolean;
  public favorites: any;

  constructor(private db: AngularFireDatabase) {
    this.user = this.getUser();
  }

  getUser = () => {
    const data = localStorage.getItem('user') as string;
    const userData = JSON.parse(data);
    return userData;
  };

  getFavorites = async () => {
    this.favorites = null;
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}/favoritos`)
      .get();
    console.log(snapshot.val());

    if (snapshot.val()) {
      this.favorites = snapshot.val();
    }
    return this.favorites;
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
      isFavorite = snapshot
        .val()
        .find(
          (plate: any) =>
            plate.cereal === randomPlate.cereal &&
            plate.protein === randomPlate.protein &&
            plate.vegetable === randomPlate.vegetable &&
            plate.fuit === randomPlate.fruit
        )
        ? true
        : false;
    } else {
      isFavorite = false;
    }
    return isFavorite;
  };

  saveAsFav = async (plate: object) => {
    console.log('--SAVING FAV--', this.user.displayName);
    const favoritesLength = await this.getLength('favoritos');
    console.log('fav length', favoritesLength);
    this.db.database
      .ref(`users/${this.user.displayName}/favoritos/${favoritesLength}`)
      .set(plate);

    this.isFavorite = true;
  };

  deleteFav = async (plate: any) => {
    console.log('DELETE FAV');
    const favoritesLength = await this.getLength('favoritos');
    console.log('favoritesLength', favoritesLength);
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
  };

  banIngredient = async (ingredient: string, category: string) => {
    this.db.database
      .ref(`users/${this.user.displayName}/prohibidos/${ingredient}`)
      .set(category);
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
