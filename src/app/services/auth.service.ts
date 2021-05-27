import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Credentials, RegisterCredentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase,
    private userService: UserService
  ) {}

  checkLogin = () => {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        console.log('STILL SIGNED', user);
      } else {
        console.log('SIGNED OUT');
      }
    });
  };

  login = (credentials: Credentials) => {
    this.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => {
        console.log('USER SIGNED', user);
        console.log(
          'bienvenido:',
          user.user ? user.user.displayName : 'no displayname'
        );

        if (user.user) {
          if (user.user.emailVerified) {
            localStorage.setItem('user', JSON.stringify(user.user));
            this.userService.getUser();
            this.router.navigate(['/plate-generator']);
          } else {
            alert('This email is not verified yet. Please check your inbox');
          }
        }
        // Signed in
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  register = (credentials: RegisterCredentials) => {
    // this.checkUserName(credentials.userName);
    // if (this.checkUserName(credentials.userName)) {
    //   alert(
    //     `Lo sentimos, el nombre de usuario ${credentials.userName} ya existe. Por favor, elige otro.`
    //   );
    // } else {
    this.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(credential => {
        console.log('USER registered', credential);
        this.db.database
          .ref('users')
          .child(credentials.userName)
          .child('email')
          .set(credentials.email);

        if (credential.user) {
          credential.user.updateProfile({
            displayName: credentials.userName
          });
        }

        this.verificarEmail(credential);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage + errorCode);
        // ..
      });
    //}
  };

  checkUserName = async (userName: string) => {
    const usersSnapshot = await this.db.database.ref('users').get();
    console.log(usersSnapshot.val());
    return false;
  };

  verificarEmail = (registeredUser: any) => {
    registeredUser.user
      .sendEmailVerification()
      .then(() => {
        // Email sent.
        alert(
          'Por favor, revisa tu bandeja de entrada. Te hemos enviado un email para verificar tu cuenta'
        );

        this.router.navigate(['/login']);
      })
      .catch((error: any) => {
        // An error happened.
        console.log('Ha ocurrido un error. Inténtalo de nuevo.', error);
      });
  };

  logOut = () => {
    this.auth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('favorites');
        console.log('Usuario ha cerrado sesión');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  resetPassword = (email: string) => {
    this.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Te hemos enviado un email para que modifiques tu contraseña');
        this.router.navigate(['/login']);
      })
      .catch(() => alert('Ha ocurrido un error. Inténtelo de nuevo'));
  };
}
