import { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { v1 as uuid } from 'uuid';

import jwtConfig from '../../../../config/jwtConfig';

const { secret } = jwtConfig;

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

        return res.json({ success: true, content: { user, token } });
      });
    }
  })(req, res);
}
