import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public routeUrl!: string;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private location: Location
  ) {
    this.routeUrl = this.location.path();
    console.log('RUTA', this.location.path());
  }

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

  ngOnInit(): void {}
}
