import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { BoardService } from './board/board.service';
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql';
import { AppResolver } from './app/app.resolver';
import { AppService } from './app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './shared/util/typeOrmConfig';
import { JwtMiddleware } from './user/jwt/jwt.middleware';
import { UserService } from './user/user.service';
import { JwtService } from './user/jwt/jwt.service';
import { JwtModule } from './user/jwt/jwt.module';

@Module({
  imports: [
    UserModule,
    BoardModule,
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      ...typeormConfig,
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => {
        const schemaModuleOptions: Partial<GqlModuleOptions> = {};

        // If we are in development, we want to generate the schema.graphql
        if (process.env.NODE_ENV !== 'production' || process.env.IS_OFFLINE) {
          schemaModuleOptions.autoSchemaFile = 'schema.graphql';
          schemaModuleOptions.debug = true;
        } else {
          // For production, the file should be generated
          schemaModuleOptions.typePaths = ['dist/schema.graphql'];
        }

        schemaModuleOptions.uploads = {
          maxFileSize: 10000000, // 10 MB
          maxFiles: 5,
        };

        schemaModuleOptions.formatError = (error) => {
          console.log(error.message);
          return error;
        };

        return {
          context: ({ req }) => ({ user: req['user'] }),
          playground: true, // Allow playground in production
          introspection: true, // Allow introspection in production
          ...schemaModuleOptions,
        };
      },
    }),

    // jwt module의 서명키 설정
    JwtModule.forRoot({
      privateKey: 'test_private_key',
    }),
  ],
  providers: [AppService, BoardService, AppResolver, UserService],
})

// graphql 요청 마다 사용자의 jwt token을 검사
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.POST,
    });
  }
}
