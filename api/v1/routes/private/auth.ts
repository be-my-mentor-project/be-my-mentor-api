import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { removeSession } from 'session';

export function logout(req: Request, res: Response) {
  function errorMessage() {
    res.json({ success: false, content: 'token is corrupted' });
  }

  try {
    const { authorization } = req.headers;
    const token = authorization.substring(4);
    const decodedToken = jwt.decode(token);

    if (typeof decodedToken === 'object') {
      if (!Reflect.has(decodedToken, 'jti')) {
        errorMessage();
      }
      const { jti } = decodedToken;
      removeSession(jti);

      res.json({ success: true, content: null });
    } else {
      errorMessage();
    }
  } catch(e) {
    errorMessage();
  }
}
