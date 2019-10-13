import { UserDTO } from 'api/v1/DTO';
import User from 'models/User';

export function userDeserialize(user: User): UserDTO {
  const userDTO: UserDTO = {
    id: user.id,
    username: user.username,
    status: user.status,
    role: user.role,
    firstName: user.firstName,
  };

  if (user.lastName) {
    userDTO.lastName = user.lastName;
  }

  return userDTO
}
