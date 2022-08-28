import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Movie } from './movie.entity';

@ObjectType()
export class MovieRate {
  @Field(() => ID)
  id: string;

  @Field()
  comment: string;

  @HideField()
  movieId: string;

  @HideField()
  userId: string;

  @Field()
  rating: number;

  @Field(() => Movie)
  movie: Movie;
}
