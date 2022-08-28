import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from './common/gql-auth.guard';
import { MovieRate } from './models/movie-rate.model';
import { Movie } from './models/movie.entity';

@UseGuards(GqlAuthGuard)
@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => [MovieRate])
  public rates(@Parent() movie: Movie) {
    return this.prisma.movieRate.findMany({
      where: { AND: [{ movieId: movie.id, userId: movie.userId }] },
    });
  }
}
