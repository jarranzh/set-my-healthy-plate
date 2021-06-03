import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
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

  login = (credentials: Credentials) => {
    this.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => {
        if (user.user) {
          if (user.user.emailVerified) {
            localStorage.setItem('user', JSON.stringify(user.user));
            this.userService.getUser();
            this.router.navigate(['/plate-generator']);
          } else {
            alert(
              'Esta cuenta todavía no se ha verificado. Por favor comprueba tu bandeja de entrada.'
            );
          }
        }
        // Signed in
      })
      .catch(error => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  register = (credentials: RegisterCredentials) => {
    this.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(credential => {
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
      });
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
        alert('Ha ocurrido un error. Inténtalo de nuevo.');
      });
  };

  logOut = () => {
    this.auth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        const errorMessage = error.message;
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
