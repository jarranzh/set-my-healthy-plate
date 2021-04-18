import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plate-generator',
  templateUrl: './plate-generator.component.html',
  styleUrls: ['./plate-generator.component.scss']
})
export class PlateGeneratorComponent implements OnInit {
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

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.auth.onAuthStateChanged((user: any) => {
      if (user) {
        this.user = user;
        console.log('usuario conectado:', user);
      } else {
        this.user = null;
        console.log('no user connected');
        this.router.navigate(['/login']);
      }
    });
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
        // this.randomFruit = this.getRandomIngredient(this.fruits);

        this.cereals = Object.keys(snapshot.val()).filter(
          key => snapshot.val()[key] === 'cereal'
        );
      });

    this.db.database
      .ref('users')
      .get()
      .then((snapshot: any) => {
        console.log('prohibidos', snapshot.val().usertest.prohibido);
        console.log('favoritos', snapshot.val().usertest.platosFavoritos);
      });

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

    this.getLength();
  }

  public getLength = () => {
    console.log(
      this.db.database
        .ref('users')
        .get()
        .then((snapshot: any) => {
          console.log('prohibidos', snapshot.val().usertest3.prohibidos.length);
        })
    );
  };

  public getRandomIngredient = (familyOfIngredients: any) => {
    const randomItem =
      familyOfIngredients[
        Math.floor(Math.random() * familyOfIngredients.length)
      ];
    return randomItem;
  };

  public getRandomPlate = () => {
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
    return this.randomPlate;
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

  public saveAsFav = () => {};

  ngOnInit(): void {}
}
