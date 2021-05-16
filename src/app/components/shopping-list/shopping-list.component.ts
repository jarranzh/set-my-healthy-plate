import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  isLoading = false;
  public shoppingList!: string[];
  public user!: User;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this.userService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.getShoppingList();
    }
  }

  getShoppingList = async () => {
    this.isLoading = true;
    this.shoppingList = await this.userService.getShoppingList();
    this.isLoading = false;
  };

  removeFromShoppingList = async (event: any) => {
    console.log(event.source.value);
    await this.userService.removeFromShoppingList(event.source.value);
    this.getShoppingList();
  };
}
