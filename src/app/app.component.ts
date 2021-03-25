import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'set-my-healthy-plate';
  public proteinas: any;
  public verduras: any;
  public fruits: any;
  public cereals: any;
  public randomFruit: any;
  public randomProtein: any;
  public menu: any[] = new Array(7).fill(null);

  constructor(private db: AngularFireDatabase) {
    this.db.database
      .ref('Ingredientes')
      .get()
      .then((snapshot: any) => {
        this.proteinas = Object.keys(snapshot.val()).filter(
          key => snapshot.val()[key] === 'protein'
        );
        this.verduras = Object.keys(snapshot.val()).filter(
          key => snapshot.val()[key] === 'vegetable'
        );
        this.fruits = Object.keys(snapshot.val()).filter(
          key => snapshot.val()[key] === 'fruit'
        );
        // this.randomFruit = this.getRandomIngredient(this.fruits);

        this.cereals = Object.keys(snapshot.val()).filter(
          key => snapshot.val()[key] === 'cereal'
        );
      });
  }

  public getRandomIngredient = (familyOfIngredients: any) => {
    const randomItem =
      familyOfIngredients[
        Math.floor(Math.random() * familyOfIngredients.length)
      ];
    return randomItem;
  };

  public setMenu = () => {
    console.log('initial menu: ', this.menu);
    console.log(this.proteinas);
    this.menu.map(e => {
      //for every day get me the 4 random ingredients:
      const saludo = 'hola';
      // const protein = this.getRandomIngredient(this.proteinas);
      // const cereal = this.getRandomIngredient(this.cereals);
      // const fruit = this.getRandomIngredient(this.fruits);
      // const vegetable = this.getRandomIngredient(this.verduras);
      // const plate = {
      //   [protein]: 'protein',
      //   [cereal]: 'cereal',
      //   [fruit]: 'fruit',
      //   [vegetable]: 'vegetable'
      // };
      // console.log('plate', plate);
      // return plate;
      return { [saludo]: 'saludo' };
    });
    console.log('menu', this.menu);
  };
}
