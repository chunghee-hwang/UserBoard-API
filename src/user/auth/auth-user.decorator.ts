import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// 로그인된 사용자를 가져올 수 있는 데코레이터
export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // httpContext 에서 gqlContext로 변환
    const graphqlContext = GqlExecutionContext.create(context).getContext();
    const user = graphqlContext['user'];
    return user;
  },
);
