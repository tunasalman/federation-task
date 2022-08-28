import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MovieRateCreateInput {
  @Field()
  movieId!: string;

  @Field()
  comment: string;

  @Field()
  rating: number;
}
