import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  showPlatosFavoritos = false;
  public platosFavoritos: any;
  public user: any;

  constructor(
    private userService: UserService,
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.auth.onAuthStateChanged(async (user: any) => {
      if (user && user.emailVerified) {
        this.user = user;
        console.log('usuario conectado:', user);
        this.platosFavoritos = await this.getFavoritos();
        this.showPlatosFavoritos = true;
        console.log('platos favoritos----', this.platosFavoritos);
      } else {
        this.user = null;
        console.log('no user connected');
        this.router.navigate(['/login']);
      }
    });
  }

  getFavoritos = async () => {
    let favoritos = null;
    const snapshot = await this.db.database
      .ref(`users/${this.user.displayName}`)
      .get();

    if (snapshot.val()) {
      favoritos = snapshot.val().favoritos;
      this.showPlatosFavoritos = true;

      console.log('favoritos:', favoritos);
    }
    return favoritos;
  };

  ngOnInit(): void {}
}
