import { Status, Role } from 'models/User';

export interface UserErrorsDTO {
  username?: string,
  password?: string,
  firstName?: string,
  status?: string,
  role?: string,
}

export interface UserDTO {
  id: string,
  username: string,
  status: Status,
  role: Role,
  firstName: string,
  lastName?: string,
}

export interface UserLoginDTO {
  id: string,
  username: string,
}
