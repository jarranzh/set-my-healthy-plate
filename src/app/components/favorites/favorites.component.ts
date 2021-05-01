import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { faHeart as regularFaHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  showPlatosFavoritos = false;
  public platosFavoritos: any;
  public user: any;
  public solidFaHeart = solidFaHeart;
  public regularFaHeart = regularFaHeart;

  constructor(public userService: UserService) {
    this.getFavoritos();
  }

  getFavoritos = async () => {
    this.platosFavoritos = await this.userService.getFavorites();
    this.showPlatosFavoritos = true;
  };

  deleteFav = (plate: any) => {
    this.userService.deleteFav(plate);
    this.getFavoritos();
  };

  ngOnInit(): void {}
}
