import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { CurrentUser } from './common/current-user.decorater';
import { GqlAuthGuard } from './common/gql-auth.guard';
import { MovieRateCreateInput } from './dto/rate-create.dto';
import { MovieRateUpdateInput } from './dto/rate-update.dto';
import { MovieRate } from './models/movie-rate.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => MovieRate)
export class MovieRateResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => MovieRate)
  async createMovieRate(
    @CurrentUser() userId: string,
    @Args('data') { comment, movieId, rating }: MovieRateCreateInput,
  ) {
    return this.prisma.movieRate.create({
      data: {
        movieId,
        comment,
        rating,
        userId,
      },
    });
  }

  @Mutation(() => MovieRate, { nullable: true })
  async updateMovieRate(
    @CurrentUser() userId: string,
    @Args('data') { id, comment, rating }: MovieRateUpdateInput,
  ) {
    await this.prisma.movieRate.updateMany({
      where: { AND: [{ id, userId }] },
      data: { comment, rating },
    });
    return this.prisma.movieRate.findFirst({
      where: { AND: [{ id, userId }] },
    });
  }

  @Mutation(() => MovieRate)
  async deleteMovieRate(@CurrentUser() userId: string, @Args('id') id: string) {
    return this.prisma.movieRate.deleteMany({
      where: { AND: [{ id, userId }] },
    });
  }
}
