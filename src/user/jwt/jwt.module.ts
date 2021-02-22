import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTION } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Module({})
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTION,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
