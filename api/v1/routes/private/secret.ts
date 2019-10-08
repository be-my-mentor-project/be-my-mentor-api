import { Request, Response } from 'express';

export function secret(req: Request, res: Response) {
  res.json({
    success: true,
    content: {
      isSecret: true,
      onlyForAuthorizedUsers: true
    }
  });
}
