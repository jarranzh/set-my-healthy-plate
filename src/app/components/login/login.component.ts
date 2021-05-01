import { LoginState } from './reducer/login.reducer';
import { AppState } from './../../app.reducers';
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
import { Store } from '@ngrx/store';
import * as LoginAction from './actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userLogged: any;
  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;
  private validateEmail = '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$';
  public message = '';
  loginState$!: LoginState;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.store.select('login').subscribe(login => (this.loginState$ = login));
  }

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
    console.log('click');
    const credentials = {
      email: this.email.value,
      password: this.password.value
    };

    // this.store.dispatch(LoginAction.login({ credentials }));

    this.authService.login(credentials);
  };
}
