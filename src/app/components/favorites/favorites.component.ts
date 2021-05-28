import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';
import { Plate } from 'src/app/models/plate';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  isLoading = false;
  public platosFavoritos!: Plate[];
  public user!: User;
  public solidFaHeart = solidFaHeart;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.getFavoritos();
    }
  }

  getFavoritos = async () => {
    this.isLoading = true;
    this.platosFavoritos = await this.userService.getFavorites();
    this.isLoading = false;
  };

  deleteFav = (plate: any) => {
    if (confirm('¿Seguro que quieres eliminarlo de favoritos?')) {
      this.userService.deleteFav(plate).then(() => {
        this.getFavoritos();
      });
    }
  };
}
