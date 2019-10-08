import { Status, Role } from 'models/User';

export default interface UserDTO {
  id: string,
  username: string,
  status: Status,
  role: Role,
  firstName?: string,
  lastName?:string
}
