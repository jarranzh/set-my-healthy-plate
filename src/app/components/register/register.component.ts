import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public userLogged: any;
  public email!: FormControl;
  public password!: FormControl;
  public userName!: FormControl;
  public registerForm!: FormGroup;
  private validateEmail = '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$';
  public message = '';

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private firebase: AngularFireModule,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.validateEmail)
    ]);
    this.password = new FormControl('', [Validators.required]);
    this.userName = new FormControl('', [Validators.required]);

    this.registerForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      userName: this.userName
    });
  }

  // Chequear si el userName ya existe en la DB para no dejar crear el usuario

  public register = () => {
    this.auth
      .createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(credential => {
        console.log('USER registered', credential);
        this.db.database
          .ref('users')
          .child(this.userName.value)
          .child('email')
          .set(this.email.value);

        if (credential.user) {
          credential.user.updateProfile({ displayName: this.userName.value });
        }

        this.verificarEmail(credential);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage + errorCode);
        // ..
      });
  };

  public verificarEmail = (registeredUser: any) => {
    registeredUser.user
      .sendEmailVerification()
      .then(() => {
        // this.goHome();
        // Email sent.
        alert(
          'Please check your inbox. We sent you an email to verify your account'
        );

        this.router.navigate(['/login']);
      })
      .catch(function(error: any) {
        // An error happened.
        console.log('an error happened', error);
      });
  };

  public goHome = () => {
    this.router.navigate(['/plate-generator']);
  };
}
