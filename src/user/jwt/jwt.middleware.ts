import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, json } from 'express';
import { UserService } from '../user.service';
import { JwtService } from './jwt.service';
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  sendError(res: Response) {
    res.json({
      error: 'You must provide proper jwt token',
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    if ('token' in req.headers) {
      const token = req.headers['token'];
      try {
        const decodedToken = this.jwtService.decodeToken(token.toString());
        if (
          typeof decodedToken === 'object' &&
          decodedToken.hasOwnProperty('id')
        ) {
          const user = await this.userService.findById(decodedToken['id']);
          req['user'] = user;
        }
      } catch (e) {}
    }
    next();
  }
}
