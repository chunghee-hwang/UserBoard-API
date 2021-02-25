// 게시판 리졸버

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/user/auth/auth-user.decorator';
import { AuthGuard } from 'src/user/auth/auth.guard';
import { User } from 'src/user/user.model';
import { BoardService } from './board.service';
import { CreateBoardInput, CreateBoardOutput } from './dto/create-board.dto';
import { DeleteBoardInput, DeleteBoardOutput } from './dto/delete-board.dto';
import { ModifyBoardInput, ModifyBoardOutput } from './dto/modify-board.dto.ts';

@Resolver()
export class BoardResolver {
  constructor(private readonly _boardService: BoardService) {}

  // 게시물 생성
  @UseGuards(AuthGuard)
  @Mutation((_) => CreateBoardOutput)
  async createBoard(
    @AuthUser() authUser: User,
    @Args() createBoardInput: CreateBoardInput,
  ): Promise<CreateBoardOutput> {
    return this._boardService.createBoard(createBoardInput, authUser);
  }

  // 게시물 삭제
  @UseGuards(AuthGuard)
  @Mutation((_) => DeleteBoardOutput)
  async deleteBoard(
    @AuthUser() authUser: User,
    @Args() deleteBoardInput: DeleteBoardInput,
  ): Promise<DeleteBoardOutput> {
    return this._boardService.deleteBoard(deleteBoardInput, authUser);
  }

  // 게시물 수정
  @UseGuards(AuthGuard)
  @Mutation((_) => ModifyBoardOutput)
  async modifyBoard(
    @AuthUser() authUser: User,
    @Args() modifyBoardInput: ModifyBoardInput,
  ): Promise<ModifyBoardOutput> {
    return this._boardService.modifyBoard(modifyBoardInput, authUser);
  }
}
