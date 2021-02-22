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

  @Query((_) => SearchUserOrBoardsOutput)
  async searchUserOrBoards(
    @Args('userId')
    userId: number,
  ): Promise<SearchUserOrBoardsOutput> {
    return this._appService.searchUserOrBoards(userId);
  }
}
