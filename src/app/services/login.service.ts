import { AngularFireAuth } from '@angular/fire/auth';
import { Credentials } from './../models/credentials';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userLogged: any;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  login = (credentials: Credentials): Observable<any> => {
    console.log('login service');

    const observable = from(
      this.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );

    this.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => {
        console.log('USER SIGNED', user);
        console.log(
          'bienvenido:',
          user.user ? user.user.displayName : 'no displayname'
        );
        this.userLogged = user.user;

        this.userLogged.emailVerified
          ? this.router.navigate(['/plate-generator'])
          : alert('This email is not verified yet. Please check your inbox');
        // Signed in
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });

    return observable;
  };
}
