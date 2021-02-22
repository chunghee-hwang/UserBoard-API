import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTION } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTION) private readonly options: JwtModuleOptions,
  ) {}

  getToken(userId: number): string {
    return jwt.sign({ id: userId }, this.options.privateKey);
  }

  decodeToken(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
