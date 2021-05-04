import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  isLoading = false;
  public platosFavoritos: any;
  public user: any;
  public solidFaHeart = solidFaHeart;

  constructor(public userService: UserService) {
    this.getFavoritos();
  }

  getFavoritos = async () => {
    this.isLoading = true;
    this.platosFavoritos = await this.userService.getFavorites();
    console.log('platos favorits', this.platosFavoritos);
    this.isLoading = false;
  };

  deleteFav = (plate: any) => {
    this.userService.deleteFav(plate).then(() => {
      this.getFavoritos();
    });
  };

  ngOnInit(): void {}
}
