import { Express } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { isAuthenticated } from 'session';
import jwtConfig from 'config/jwtConfig';
import User, { Role, Status } from 'models/User';
import { UserLoginDTO } from './DTO';

const { secret, saltRounds } = jwtConfig;

export default function configurePassport(app: Express) {
  app.use(passport.initialize());

  passport.use(
    'login',
    new LocalStrategy(
      async (username, password, done) => {
        try {
          const user = await User.findOne({ where: { username } });
          if (user) {
            const passwordIsCorrect = bcrypt.compareSync(password, user.password);
            if (passwordIsCorrect) {

              const userDTO: UserLoginDTO = {
                id: user.id,
                username: user.username
              };

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
    new JWTStrategy(opts, async ({ jti, id }, done) => {
      if (!jti || !id) {
        done(null, false);
      }

      try {
        const user = await User.findOne({ where: { id } });
        if (user && isAuthenticated(jti)) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch(e) {
        done(e);
      }
    }));
}
