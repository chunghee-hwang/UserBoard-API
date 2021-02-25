/* eslint-disable @typescript-eslint/no-unused-vars */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { config } from 'dotenv';
import { resolve } from 'path';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { Board } from 'src/board/board.model';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user = {
    name: 'hakhak',
    password: '1234',
    token: null,
    id: null,
  };

  beforeAll(async () => {
    config({ path: resolve(__dirname, `../.${process.env.NODE_ENV}.env`) });
    console.log(process.env.NODE_ENV);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('user create', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {createUser(name: "${user.name}", password: "${user.password}"){name, ok, error}}`,
      })
      .expect(200)
      .expect(({ body }) => {
        if (body.data.createUser.ok) {
          expect(body.data.createUser.name).toBe(user.name);
        } else {
          expect(body.data.createUser.error).toBe('The name is in use.');
        }
      });
  });

  describe('user can login', () => {
    it('user incorrect login', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `mutation {loginUser(name: "${user.name}wrong", password: "${user.password}wrong"){error, token}}`,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.loginUser.error).not.toBeNull();
          expect(body.data.loginUser.token).toBeNull();
        });
    });

    describe('user correct login', () => {
      it('login', () => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: `mutation {loginUser(name: "${user.name}", password: "${user.password}"){ token }}`,
          })
          .expect(200)
          .expect(({ body }) => {
            const token = body.data.loginUser.token;
            expect(token).not.toBeNull();
            user.token = token;
          });
      });

      // it('user delete', () => {
      //   return request(app.getHttpServer())
      //     .post('/graphql')
      //     .set('token', `${user.token}`)
      //     .send({
      //       query: `mutation {deleteUser{name, ok, error}}`,
      //     })
      //     .expect(200)
      //     .expect(({ body }) => {
      //       if (body.data.deleteUser.ok) {
      //         expect(body.data.deleteUser.name).toBe(user.name);
      //       } else {
      //         console.log(body.data.deleteUser.error);
      //       }
      //     });
      // });

      let board = {
        title: '학학이 소개',
        content: '학학이는 살아있어요',
        id: null,
      };

      describe('user can manage boards', () => {
        it('create board', () => {
          return request(app.getHttpServer())
            .post('/graphql')
            .set('token', `${user.token}`)
            .send({
              query: `mutation {
                createBoard(title: "${board.title}", content:"${board.content}"){
                  id, title, content, author{name}}
                }`,
            })
            .expect(200)
            .expect(({ body }) => {
              const boardId = body.data.createBoard.id;
              expect(boardId).not.toBeNull();
              expect(body.data.createBoard.title).toBe(board.title);
              expect(body.data.createBoard.content).toBe(board.content);
              expect(body.data.createBoard.author.name).toBe(user.name);
              board.id = boardId;
            });
        });

        it('modify board', () => {
          board = {
            ...board,
            title: '학학이가 수정한 제목',
            content: '학학이가 수정한 내용',
          };
          return request(app.getHttpServer())
            .post('/graphql')
            .set('token', `${user.token}`)
            .send({
              query: `mutation {
                modifyBoard(title: "${board.title}", content:"${board.content}", id:${board.id}){
                  title, content}
                }`,
            })
            .expect(200)
            .expect(({ body }) => {
              expect(body.data.modifyBoard.title).toBe(board.title);
              expect(body.data.modifyBoard.content).toBe(board.content);
            });
        });
      });

      describe('user can view boards', () => {
        it('boards of user', () => {
          return request(app.getHttpServer())
            .post('/graphql')
            .send({
              query: `query {
                getBoards(userName:"${user.name}"){
                  ok,
                  boards{
                    title, content, author{
                      name
                    }
                  }
                }
              }`,
            })
            .expect(200)
            .expect(({ body }) => {
              expect(body.data.getBoards.boards).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({ author: { name: user.name } }),
                ]),
              );
            });
        });

        it('search user or boards by id', () => {
          const searchUserId = user.id;
          return request(app.getHttpServer())
            .post('/graphql')
            .send({
              query: `query {
                searchUserOrBoards(userId: 25){
                  user{
                    name,id
                  }, boards{
                    id
                    title
                    content
                  }
                }
              }`,
            })
            .expect(200)
            .expect(({ body }) => {
              expect(body.data.searchUserOrBoards.user).toEqual(
                expect.objectContaining({ name: user.name }),
              );
              expect(body.data.searchUserOrBoards.boards).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({ title: board.title }),
                ]),
              );
            });
        });
      });

      describe('user can delete board', () => {
        it('delete board', () => {
          return request(app.getHttpServer())
            .post('/graphql')
            .set('token', `${user.token}`)
            .send({
              query: `mutation {
                deleteBoard(id:${board.id}){
                  id }
                }`,
            })
            .expect(200)
            .expect(({ body }) => {
              expect(body.data.deleteBoard.id).toBe(board.id);
            });
        });
      });
    });
  });
});
