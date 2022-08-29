import { MovieCreateInput } from 'src/dto/movie-create.dto';
import { MovieUpdateInput } from 'src/dto/movie-update.dto';
import { Movie } from '../models/movie.model';

export const MovieRepositoryToken = 'MovieRepository';

export interface MovieRepository {
  saveMovie(createMovieInput: MovieCreateInput): Promise<Movie>;
  findMoviesByUserId(userId: string): Promise<Movie[]>;
  findMovieByUserId(id: string, userId: string): Promise<Movie>;
  updateMovie(updateMovieInput: MovieUpdateInput): Promise<Movie>;
}
