import { UserErrorsDTO } from 'api/v1/DTO';
import User from 'models/User';

export default function validate(userProps: User) {
  const errors: UserErrorsDTO = {};

  if (!Reflect.has(userProps, 'username') || userProps.username.trim().length === 0) {
    errors.username = `Username can't be blank`;
  }

  if (!Reflect.has(userProps, 'password')  || userProps.password.trim().length === 0) {
    errors.password = `Password can't be blank`;
  }

  if (!Reflect.has(userProps, 'firstName') || userProps.firstName.trim().length === 0) {
    errors.firstName = `First name can't be blank`;
  }

  if (!Reflect.has(userProps, 'role') || userProps.role.trim().length === 0) {
    errors.role = `Role can't be blank`;
  }

  if (!Reflect.has(userProps, 'status') || userProps.status.trim().length === 0) {
    errors.status = `Status can't be blank`;
  }

  return errors;
}
