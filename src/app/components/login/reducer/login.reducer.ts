import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess } from '../action';

export interface LoginState {
  email: string | null;
  loggedIn: boolean;
  verifiedEmail: boolean;
  error: string | null;
  pending: boolean;
}

export const initialState: LoginState = {
  email: null,
  loggedIn: false,
  verifiedEmail: false,
  error: null,
  pending: false
};

const loginReducer = createReducer(
  initialState,
  on(login, state => {
    ...state,
    loggedIn: false,
    verifiedEmail: false,
    error: null,
    pending: true,
  })
);

// export function loginReducer(state: any, action: any) {
//   return _loginReducer(state, action);
// }
