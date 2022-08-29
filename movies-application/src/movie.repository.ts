import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MovieCreateInput } from './dto/movie-create.dto';
import { MovieUpdateInput } from './dto/movie-update.dto';
import { MovieRepository } from './interfaces/movie-repository.interface';

@Injectable()
export class MovieRepositoryService implements MovieRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMoviesByUserId(userId: string) {
    return this.prisma.movie.findMany({
      where: { userId },
    });
  }

  findMovieByUserId(id: string, userId: string) {
    return this.prisma.movie.findFirst({
      where: { AND: [{ id, userId }] },
    });
  }

  saveMovie(createMovieInput: MovieCreateInput) {
    return this.prisma.movie.create({
      data: {
        ...createMovieInput,
      },
    });
  }

  async updateMovie({ id, userId, name, releaseDate }: MovieUpdateInput) {
    const up = await this.prisma.movie.updateMany({
      where: { AND: [{ id, userId }] },
      data: { name, releaseDate },
    });
    if (up.count == 1) {
      return this.prisma.movie.findFirst({ where: { AND: [{ id, userId }] } });
    }
  }
}
