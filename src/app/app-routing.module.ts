import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PlateGeneratorComponent } from './components/plate-generator/plate-generator.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { WeeklyMenuComponent } from './components/weekly-menu/weekly-menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/plate-generator', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'plate-generator', component: PlateGeneratorComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'weekly-menu', component: WeeklyMenuComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
