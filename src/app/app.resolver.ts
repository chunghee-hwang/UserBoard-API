import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetBoardsOutput } from 'src/board/dto/get-boards.dto';
import { AppService } from './app.service';
import { SearchUserOrBoardsOutput } from './dto/search-user-or-boards.dto';

@Resolver((_) => String)
export class AppResolver {
  constructor(private readonly _appService: AppService) {}

  // 유저 아이디로 유저 정보나 유저가 작성한 게시물 검색
  @UseInterceptors(ClassSerializerInterceptor)
  @Query((_) => SearchUserOrBoardsOutput)
  async searchUserOrBoards(
    @Args('userId')
    userId: number,
  ): Promise<SearchUserOrBoardsOutput> {
    return this._appService.searchUserOrBoards(userId);
  }

  // 한 사용자가 만든 모든 게시물 가져오기
  @UseInterceptors(ClassSerializerInterceptor)
  @Query((_) => GetBoardsOutput)
  async getBoards(userName: string): Promise<GetBoardsOutput> {
    return this._appService.getBoardsByUsername(userName);
  }
}
