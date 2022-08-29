import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { CurrentUser } from './common/current-user.decorater';
import { GqlAuthGuard } from './common/gql-auth.guard';
import { MovieCreateInput } from './dto/movie-create.dto';
import { MovieUpdateInput } from './dto/movie-update.dto';

import { Movie } from './models/movie.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Movie], { nullable: true })
  movies(@CurrentUser() userId: string) {
    return this.prisma.movie.findMany({
      where: { userId },
    });
  }

  @Query(() => Movie, { nullable: true })
  movie(
    @Args({ name: 'id', type: () => ID }) id: string,
    @CurrentUser() userId: string,
  ) {
    return this.prisma.movie.findFirst({
      where: { AND: [{ id, userId }] },
    });
  }

  @Mutation(() => Movie)
  async createMovie(
    @Args('data') { name, releaseDate }: MovieCreateInput,
    @CurrentUser() userId: string,
  ) {
    return this.prisma.movie.create({
      data: {
        name,
        releaseDate,
        userId,
      },
    });
  }

  @Mutation(() => Movie, { nullable: true })
  async updateMovie(
    @Args('data') { id, name, releaseDate }: MovieUpdateInput,
    @CurrentUser() userId: string,
  ) {
    await this.prisma.movie.updateMany({
      where: { AND: [{ id, userId }] },
      data: { name, releaseDate },
    });

    return this.prisma.movie.findFirst({ where: { AND: [{ id, userId }] } });
  }
}
