import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from './common/current-user.decorater';
import { GqlAuthGuard } from './common/gql-auth.guard';
import { MovieCreateInput } from './dto/movie-create.dto';
import { MovieUpdateInput } from './dto/movie-update.dto';
import {
  MovieRepository,
  MovieRepositoryToken,
} from './interfaces/movie-repository.interface';

import { Movie } from './models/movie.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => Movie)
export class MoviesResolver {
  @Inject(MovieRepositoryToken) movieRepository: MovieRepository;
  constructor() {}

  @Query(() => [Movie], { nullable: true })
  movies(@CurrentUser() userId: string) {
    return this.movieRepository.findMoviesByUserId(userId);
  }

  @Query(() => Movie, { nullable: true })
  async movie(
    @Args({ name: 'id', type: () => ID }) id: string,
    @CurrentUser() userId: string,
  ) {
    const movie = await this.movieRepository.findMovieByUserId(id, userId);
    if (!movie) {
      throw new NotFoundException('movie_not_found');
    }
    return movie;
  }

  @Mutation(() => Movie)
  async createMovie(
    @Args('data') movieCreateInput: MovieCreateInput,
    @CurrentUser() userId: string,
  ) {
    movieCreateInput.userId = userId;
    return this.movieRepository.saveMovie(movieCreateInput);
  }

  @Mutation(() => Movie, { nullable: true })
  async updateMovie(
    @Args('data') movieUpdateInput: MovieUpdateInput,
    @CurrentUser() userId: string,
  ) {
    movieUpdateInput.userId = userId;
    const movie = await this.movieRepository.updateMovie(movieUpdateInput);
    if (!movie) {
      throw new NotFoundException('movie_not_found');
    }
    return movie;
  }
}
