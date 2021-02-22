import { Args, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { SearchUserOrBoardsOutput } from './dto/search-user-or-boards.dto';

@Resolver((_) => String)
export class AppResolver {
  constructor(private readonly _appService: AppService) {}
  @Query((_) => String)
  hello(@Args('data', { type: () => String, nullable: true }) data?: string) {
    return this._appService.getHello(data);
  }

  // 유저 아이디로 유저 정보나 유저가 작성한 게시물 검색
  @Query((_) => SearchUserOrBoardsOutput)
  async searchUserOrBoards(
    @Args('userId')
    userId: number,
  ): Promise<SearchUserOrBoardsOutput> {
    return this._appService.searchUserOrBoards(userId);
  }
}
