import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { LoginService } from '../../../services/login.service';
import * as LoginActions from '../actions';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() => {
    console.log('0 - LOGIN EFFECTS');
    return this.actions$.pipe(
      ofType(LoginActions.login),
      exhaustMap(({ credentials }) => {
        console.log('1 - LOGIN EFFECTS');
        return this.loginService.login(credentials).pipe(
          map(user => {
            console.log('LOGIN EFFECTS', user);
            return LoginActions.loginSuccess({ credentials });
          }),
          catchError(error => of(LoginActions.loginFailure({ payload: error })))
        );
      })
    );
  });

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.loginSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.logout),
      map(() => LoginActions.logoutConfirmation())
    )
  );

  logoutConfirmation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.logoutConfirmation),
        tap(() => this.router.navigate(['/activity-list']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}
}
