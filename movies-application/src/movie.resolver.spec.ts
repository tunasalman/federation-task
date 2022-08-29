import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieRepositoryToken } from './interfaces/movie-repository.interface';
import { MockMovieRepository } from './mock/movie-repository';
import { MoviesResolver } from './movies.resolver';

describe('UsersResolver', () => {
  let resolver: MoviesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesResolver,
        {
          provide: MovieRepositoryToken,
          useClass: MockMovieRepository,
        },
      ],
    })
      // .overrideGuard(AuthGuard('jwt'))
      // .useValue({
      //   canActivate: (context: ExecutionContext) => {
      //     const ctx = GqlExecutionContext.create(context);
      //     ctx.getContext().req.user = { userId: '1' };
      //     return true;
      //   },
      // })
      .compile();

    resolver = module.get<MoviesResolver>(MoviesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should resolve movies of a user', async () => {
    const userId = '1';
    const result = await resolver.movies(userId);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId,
        }),
      ]),
    );
  });

  it('should resolve movie by given id', async () => {
    const userId = '1';
    const movieId = '2';
    const result = await resolver.movie(movieId, userId);
    expect(result.id).toBe(movieId);
  });

  it('user cannot see another users movie', async () => {
    const userId = '1';
    const movieId = '3';

    try {
      await resolver.movie(userId, movieId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
