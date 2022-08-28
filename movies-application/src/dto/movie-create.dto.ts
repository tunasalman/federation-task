import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MovieCreateInput {
  @Field()
  name: string;

  @Field()
  releaseDate: Date;
}
