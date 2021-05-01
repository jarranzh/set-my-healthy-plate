import { ActionReducerMap } from '@ngrx/store';
import * as reducersLogin from './components/login/reducer';

export interface AppState {
  login: reducersLogin.LoginState;
}

export const appReducers: ActionReducerMap<AppState> = {
  login: reducersLogin.loginReducer
};

export const EffectsArray: any[] = [];
