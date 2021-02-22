import { Injectable } from '@nestjs/common';
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
  getHello(data?: string): string {
    if (data) return data;
    return 'Hello World!';
  }

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
      const boardsOutput: GetBoardsOutput = await this._boardService.getBoards(
        user,
      );
      return {
        ok: true,
        user,
        boards: boardsOutput.boards,
      };
    } catch (e) {
      return { ok: false, error: 'Fail to search user or boards.' };
    }
  }
}
