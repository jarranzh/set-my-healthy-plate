import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: any;

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  getUser = () => {
    this.auth.onAuthStateChanged((user: any) => {
      if (user && user.emailVerified) {
        this.user = user;
        console.log('usuario conectado:', user);
        return this.user;
      } else {
        console.log('no user connected');
        this.router.navigate(['/login']);
      }
    });
  };

  getFavorites = (userName: string) => {
    return this.db.database.ref(`users/${userName}/favoritos`);
  };
}
