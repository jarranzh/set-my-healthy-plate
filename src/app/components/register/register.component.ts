import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AngularFireAuth) {}

  public register = (email: string, password: string) => {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        // Signed in
        // ...
        alert('SUCCESSFULLY REGISTERED');
        this.verificarEmail();
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };

  public verificarEmail = () => {
    let user = this.auth.currentUser;

    // user.sendEmailVerification()
    //     .then(function() {
    //         // Email sent.
    //     })
    //     .catch(function(error) {
    //         // An error happened.
    //     });
  };

  ngOnInit(): void {}
}
