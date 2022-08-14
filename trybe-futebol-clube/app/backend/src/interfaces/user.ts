export interface ILoginData {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password?: string;
}

export interface IJwtValidate {
  success: boolean;
  payload: object | IUser;
}
