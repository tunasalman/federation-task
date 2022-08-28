import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields:"id,userId")')
export class Movie {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  userId: string;

  @Field(() => Date)
  releaseDate: Date;
}
