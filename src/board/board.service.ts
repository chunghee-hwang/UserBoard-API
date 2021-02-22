import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { IsNull, Repository } from 'typeorm';
import { Board } from './board.model';
import { CreateBoardInput, CreateBoardOutput } from './dto/create-board.dto';
import { DeleteBoardInput, DeleteBoardOutput } from './dto/delete-board.dto';
import { GetBoardsOutput } from './dto/get-boards.dto';
import { ModifyBoardInput, ModifyBoardOutput } from './dto/modify-board.dto.ts';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private _boardRepository: Repository<Board>,
  ) {}

  async createBoard(
    createBoardInput: CreateBoardInput,
    authUser: User,
  ): Promise<CreateBoardOutput> {
    try {
      const board = await this._boardRepository.save({
        ...createBoardInput,
        author: authUser,
      });
      return {
        ok: true,
        ...board,
      };
    } catch (e) {
      return { ok: false, error: 'Fail to create a board.' };
    }
  }

  async deleteBoard(
    { id }: DeleteBoardInput,
    authUser: User,
  ): Promise<DeleteBoardOutput> {
    try {
      const board = await this._boardRepository.findOne({
        id,
        author: authUser,
        deletedAt: IsNull(),
      });
      if (!board) {
        return { ok: false, error: 'The board is not found.' };
      }
      board.deletedAt = new Date();
      await this._boardRepository.save(board);
      return {
        ok: true,
        ...board,
      };
    } catch (e) {
      return { ok: false, error: 'Fail to delete the board.' };
    }
  }

  async modifyBoard(
    modifyBoardInput: ModifyBoardInput,
    authUser: User,
  ): Promise<ModifyBoardOutput> {
    try {
      const board = await this._boardRepository.findOne({
        id: modifyBoardInput.id,
        author: authUser,
        deletedAt: IsNull(),
      });

      if (!board) {
        return { ok: false, error: 'The board is not found.' };
      }
      const newBoard = { ...board, ...modifyBoardInput };
      await this._boardRepository.save(newBoard);
      return {
        ok: true,
        ...newBoard,
      };
    } catch (e) {
      return { ok: false, error: 'Fail to modify the board.' };
    }
  }

  async getBoards(authUser: User): Promise<GetBoardsOutput> {
    try {
      const boards = await this._boardRepository.find({
        author: authUser,
        deletedAt: IsNull(),
      });
      boards.map((board) => (board.author = authUser));
      return {
        ok: true,
        boards,
      };
    } catch (e) {
      return { ok: false, error: 'Fail to get boards.' };
    }
  }
}
