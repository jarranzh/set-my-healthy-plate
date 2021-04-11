import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'set-my-healthy-plate';

  constructor(private auth: AngularFireAuth) {}

  public logOut = () => {
    this.auth
      .signOut()
      .then(() => {
        console.log('Usuario ha cerrado sesión');
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
}
