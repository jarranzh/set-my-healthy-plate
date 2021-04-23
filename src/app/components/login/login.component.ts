import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userLogged: any;
  // public user: User = new User();
  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;
  private validateEmail = '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$';
  public message = '';

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.validateEmail)
    ]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  public login = () => {
    console.log('email', this.email);
    console.log('pass', this.password);

    this.auth
      .signInWithEmailAndPassword(this.email.value, this.password.value)
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
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
}
