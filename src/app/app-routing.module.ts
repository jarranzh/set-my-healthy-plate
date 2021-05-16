import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { NoHeaderComponent } from './components/no-header/no-header.component';
import { NotAllowedIngredientsComponent } from './components/not-allowed-ingredients/not-allowed-ingredients.component';
import { PlateGeneratorComponent } from './components/plate-generator/plate-generator.component';
import { RegisterComponent } from './components/register/register.component';
import { WeeklyMenuComponent } from './components/weekly-menu/weekly-menu.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/plate-generator', pathMatch: 'full' },
  {
    path: 'login',
    component: NoHeaderComponent,
    children: [{ path: '', redirectTo: '/login', component: LoginComponent }]
  },
  {
    path: 'register',
    component: NoHeaderComponent,
    children: [
      { path: '', redirectTo: '/register', component: RegisterComponent }
    ]
  },
  {
    path: 'plate-generator',
    component: HeaderComponent,
    children: [
      {
        path: '',
        redirectTo: '/plate-generator',
        component: PlateGeneratorComponent
      }
    ]
  },
  {
    path: 'favorites',
    component: HeaderComponent,
    children: [
      { path: '', redirectTo: '/favorites', component: FavoritesComponent }
    ]
  },
  {
    path: 'weekly-menu',
    component: HeaderComponent,
    children: [
      { path: '', redirectTo: '/weekly-menu', component: WeeklyMenuComponent }
    ]
  },
  {
    path: 'not-allowed-ingredients',
    component: HeaderComponent,
    children: [
      {
        path: '',
        redirectTo: '/not-allowed-ingredients',
        component: NotAllowedIngredientsComponent
      }
    ]
  },
  {
    path: 'shopping-list',
    component: HeaderComponent,
    children: [
      {
        path: '',
        redirectTo: '/shopping-list',
        component: ShoppingListComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
