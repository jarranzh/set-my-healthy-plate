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

const routes: Routes = [
  { path: '', redirectTo: '/plate-generator', pathMatch: 'full' },
  {
    path: 'login',
    component: NoHeaderComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  {
    path: 'register',
    component: NoHeaderComponent,
    children: [{ path: '', component: RegisterComponent }]
  },
  {
    path: 'plate-generator',
    component: HeaderComponent,
    children: [{ path: '', component: PlateGeneratorComponent }]
  },
  {
    path: 'favorites',
    component: HeaderComponent,
    children: [{ path: '', component: FavoritesComponent }]
  },
  {
    path: 'weekly-menu',
    component: HeaderComponent,
    children: [{ path: '', component: WeeklyMenuComponent }]
  },
  {
    path: 'not-allowed-ingredients',
    component: HeaderComponent,
    children: [{ path: '', component: NotAllowedIngredientsComponent }]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
