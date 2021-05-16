import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userLogged!: User;
  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;
  private validateEmail = '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$';
  public message = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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
    console.log('click');
    const credentials = {
      email: this.email.value,
      password: this.password.value
    };
    this.authService.login(credentials);
  };
}
