// 게시판 서비스

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

  // 게시물 생성
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

  // 게시물 삭제
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

  // 게시물 수정
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

  // 사용자가 작성한 모든 게시물 가져오기
  async findAllByAuthor(user: User): Promise<GetBoardsOutput> {
    try {
      const boards = await this._boardRepository.find({
        author: user,
        deletedAt: IsNull(),
      });
      return {
        ok: true,
        boards,
      };
    } catch (e) {
      return { ok: false, error: 'Fail to modify the board.' };
    }
  }
}
