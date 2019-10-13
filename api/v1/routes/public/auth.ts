import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { v1 as uuid } from 'uuid';

import { User } from 'models/User';

import { addSession } from 'session';
import jwtConfig from 'config/jwtConfig';

import { userDeserialize } from './utils';
import validate from './validations/auth';

const { secret, saltRounds } = jwtConfig;

export function login(req: Request, res: Response) {
  passport.authenticate('login', { session: false },(err, user, info) => {
    if (err) {
      res.json({ success: false, content: err });
      return;
    }

    if (info) {
      res.json({ success: false, content: info.message });
      return;
    } else {
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.json({ success: false, content: err });
        }

        const jti = uuid();
        const token = jwt.sign({
          id: user.id,
          jti
        }, secret);

        addSession(jti);

        return res.json({ success: true, content: { user, token } });
      });
    }
  })(req, res);
}

export async function registration(req: Request, res: Response) {
  try {
    const { body } = req;
    const errors = validate(body);

    if (Object.keys(errors).length !== 0) {
      res.json({ success: false, content: { validation: errors } });
      return;
    }

    const { username, password, ...userProps } = body;

    const user = await User.findOne({ where: { username } });

    if (user) {
      res.json({ success: false, content: { error: `Username ${username} already exists` } });
    } else {
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      const newUser = await User.create({
        id: uuid(),
        username,
        password: hashedPassword,
        ...userProps
      });

      if(newUser) {
        res.json({ success: true, content: { user: userDeserialize(newUser) } });
      } else {
        res.json({ success: false, content: { error: `Can't create user` } });
      }
    }
  } catch(e) {
    console.error('ERROR:', e);
    res.json({ success: false, content: { error: 'Error occurred. Please try again later' } })
  }
}
