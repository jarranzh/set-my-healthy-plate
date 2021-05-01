import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { RegisterCredentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';

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
    private formBuilder: FormBuilder,
    private authService: AuthService
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
    const credentials: RegisterCredentials = {
      email: this.email.value,
      password: this.password.value,
      userName: this.userName.value
    };
    this.authService.register(credentials);
  };
}
