import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-allowed-ingredients',
  templateUrl: './not-allowed-ingredients.component.html',
  styleUrls: ['./not-allowed-ingredients.component.scss']
})
export class NotAllowedIngredientsComponent implements OnInit {
  isLoading = false;

  public bannedIngredients!: string[];
  public user: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this.userService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.getBannedIngredients();
    }
  }
  getBannedIngredients = async () => {
    this.bannedIngredients = await this.userService.getBannedIngredients();
    this.isLoading = false;
  };
}
