export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends Credentials {
  userName: string;
}
