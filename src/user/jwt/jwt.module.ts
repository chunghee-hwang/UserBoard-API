// 서명키를 동적으로 바꿀 수 있는 JWT 모듈

import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTION } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Global()
@Module({})
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTION, // private_key option
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
