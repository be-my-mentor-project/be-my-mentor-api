import { v1 as uuid } from 'uuid';

import User, { Role, Status } from '../models/User';

export default async function createAdmin() {
  const adminUsername = 'johnDoe';

  try {
    const user = await User.findOne({ where: { username: adminUsername } });

    if (!user) {
      await User.create({
        id: uuid(),
        username: adminUsername,
        firstName: 'John',
        lastName: 'Doe',
        password: '123qwe',
        role: Role.Admin,
        status: Status.Active
      });

      console.log('Admin user was created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch(e) {
    console.log('ERROR: ', e.toString());
  }
}
