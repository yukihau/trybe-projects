export interface User {
  username: string,
  classe: string,
  level: number,
  password: string,
}

export interface UserWithId extends User {
  id: number,
}

export interface UserAsItem {
  item: UserWithId
}

export interface Service {
  code: number,
  data: UserWithId | { message: string },
}
