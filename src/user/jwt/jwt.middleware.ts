// jwt 토큰을 http request 마다 검사하는 미들웨어

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
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
      // 헤더에서 token 가져오기
      const token = req.headers['token'];
      try {
        // 토큰 서명 및 해독
        const decodedToken = this.jwtService.decodeToken(token.toString());
        if (
          typeof decodedToken === 'object' &&
          decodedToken.hasOwnProperty('id')
        ) {
          // 해독된 토큰에 있는 userId를 통해 유저 정보 가져오기
          const user = await this.userService.findById(decodedToken['id']);
          req['user'] = user; // http request에 유저 정보 심기 --> 후에 gqlContext로 접근
        }
      } catch (e) {}
    }
    next();
  }
}
