// JWT 서비스

import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTION } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTION) private readonly options: JwtModuleOptions,
  ) {}

  // 유저 아이디를 jwt로 암호화하여 토큰화
  getToken(userId: number): string {
    return jwt.sign({ id: userId }, this.options.privateKey);
  }

  // 암호화된 토큰가 유효한지 검사 후, 해독된 결과 반환
  decodeToken(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
