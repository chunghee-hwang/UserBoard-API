import { Injectable } from '@nestjs/common';
import { Board } from 'src/board/board.model';
import { BoardService } from 'src/board/board.service';
import { GetBoardsOutput } from 'src/board/dto/get-boards.dto';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { SearchUserOrBoardsOutput } from './dto/search-user-or-boards.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly _boardService: BoardService,
    private readonly _userService: UserService,
  ) {}

  // 유저 이름으로 유저가 작성한 게시물 모두 검색
  async getBoardsByUsername(username: string): Promise<GetBoardsOutput> {
    try {
      const user: User = await this._userService.findByName(username);
      if (!user) {
        return {
          ok: true,
          boards: [],
        };
      }
      const boards: Board[] = await this._boardService.findAllByAuthor(user);
      return {
        ok: true,
        boards,
      };
    } catch (e) {
      return { ok: false, error: 'Fail to get boards of the user.' };
    }
  }

  // 유저 아이디로 유저 정보나 유저가 작성한 게시물 검색
  async searchUserOrBoards(userId: number): Promise<SearchUserOrBoardsOutput> {
    try {
      const user: User = await this._userService.findById(userId);
      if (!user) {
        return {
          ok: true,
          user: null,
          boards: null,
        };
      }
      const boards: Board[] = await this._boardService.findAllByAuthor(user);
      return {
        ok: true,
        user,
        boards,
      };
    } catch (e) {
      return { ok: false, error: 'Fail to search the user or boards.' };
    }
  }
}
