import { MovieCreateInput } from 'src/dto/movie-create.dto';
import { MovieUpdateInput } from 'src/dto/movie-update.dto';
import { MovieRepository } from '../interfaces/movie-repository.interface';
import { Movie } from '../models/movie.model';

export class MockMovieRepository implements MovieRepository {
  private movies: Movie[] = [
    {
      id: '1',
      name: 'Movie1',
      userId: '1',
      releaseDate: new Date('26/03/2022'),
    },
    {
      id: '2',
      name: 'Movie2',
      userId: '1',
      releaseDate: new Date('26/03/2022'),
    },
    {
      id: '3',
      name: 'Movie3',
      userId: '2',
      releaseDate: new Date('26/03/2022'),
    },
    {
      id: '4',
      name: 'Movie4',
      userId: '2',
      releaseDate: new Date('26/03/2022'),
    },
  ];

  saveMovie(createMovieInput: MovieCreateInput): Promise<Movie> {
    return;
  }

  updateMovie(updateMovieInput: MovieUpdateInput): Promise<Movie> {
    return;
  }

  async findMovieByUserId(id: string, userId: string): Promise<Movie> {
    return this.movies.find(
      (movie) => movie.id == id && movie.userId == userId,
    );
  }

  async findMoviesByUserId(userId: string): Promise<Movie[]> {
    return this.movies.filter((movie) => movie.userId == userId);
  }
}
