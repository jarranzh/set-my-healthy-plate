import { loginFailure, logout } from './../actions/login.action';
import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess } from '../actions';

export interface LoginState {
  email: string | null;
  loggedIn: boolean;
  verifiedEmail: boolean;
  error: { url: string; status: string; message: string } | null;
  pending: boolean;
}

export const initialState: LoginState = {
  email: null,
  loggedIn: false,
  verifiedEmail: false,
  error: null,
  pending: false
};

const _loginReducer = createReducer(
  initialState,
  on(login, state => ({
    ...state,
    loggedIn: false,
    error: null,
    pending: true
  })),
  on(loginSuccess, (state, action) => ({
    ...state,
    credentials: action.credentials,
    loggedIn: true,
    error: null,
    pending: false
  })),
  on(loginFailure, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    },
    loggedIn: false,
    pending: false
  })),
  on(logout, () => initialState)
);

export function loginReducer(state: any, action: any) {
  return _loginReducer(state, action);
}
