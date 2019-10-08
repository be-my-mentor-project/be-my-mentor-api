import bcrypt from 'bcrypt';
import { v1 as uuid } from 'uuid';

import User, { Role, Status } from 'models/User';

import jwtConfig from 'config/jwtConfig';

const { saltRounds } = jwtConfig;

export default async function createAdmin() {
  const adminUsername = 'johnDoe';

  try {
    const user = await User.findOne({ where: { username: adminUsername } });

    if (!user) {
      const hashedPassword = await bcrypt.hash('123qwe', saltRounds);

      await User.create({
        id: uuid(),
        username: adminUsername,
        firstName: 'John',
        lastName: 'Doe',
        password: hashedPassword,
        role: Role.Admin,
        status: Status.Active
      });

      console.log('Admin user was created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch(e) {
    console.error('ERROR: ', e.toString());
  }
}
