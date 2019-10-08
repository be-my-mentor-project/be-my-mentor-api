import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import jwtConfig from '../../config/jwtConfig';
import User, { Role, Status } from '../../models/User';
import UserDTO from './DTO/User';

const { secret, saltRounds } = jwtConfig;

export default function configurePassport() {
  passport.use(
    'register',
    new LocalStrategy(
      async (
        username: string,
        password: string,
        done
      ) => {
        try {
          const user = await User.findOne({ where: { username } });
          if (user) {
            return done(null, false, { message: 'Username already taken' });
          }

          const hashedPassword = bcrypt.hashSync(passport, saltRounds);
          const newUser = await User.create({
            username,
            password: hashedPassword,
            role: Role.Unknown,
            status: Status.Active,
            firstName: username
          });
          return done(null, newUser);
        } catch(e) {
          done(e);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      async (username, password, done) => {
        try {
          const user = await User.findOne({ where: { username } });
          if (user) {
            const passwordIsCorrect = bcrypt.compareSync(password, user.password);
            if (passwordIsCorrect) {

              const userDTO: UserDTO = {
                id: user.id,
                username: user.username,
                status: user.status,
                role: user.role,
              };

              if (Reflect.has(user, 'firstName')) {
                userDTO.firstName = user.firstName;
              }

              if (Reflect.has(user, 'lastName')) {
                userDTO.lastName = user.lastName;
              }

              return done(null, userDTO);
            }
            return done (null, false, { message: 'Password do not match' });
          }
          return done(null, false, { message: `User with username ${username} wasn't found` })
        } catch(e) {
          return done(e);
        }
      }
    ));

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: secret
  };

  passport.use(
    'jwt',
    new JWTStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ where: { id: jwt_payload.id } });
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch(e) {
        done(e);
      }
    }));
}
