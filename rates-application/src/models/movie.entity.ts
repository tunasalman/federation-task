import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

import { MovieRate } from './movie-rate.model';
@ObjectType()
@Directive('@key(fields:"id,userId")')
export class Movie {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field(() => [MovieRate])
  rates?: MovieRate[];
}
