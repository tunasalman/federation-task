import { Field, InputType, PartialType } from '@nestjs/graphql';
import { MovieCreateInput } from './movie-create.dto';

@InputType()
export class MovieUpdateInput extends PartialType(MovieCreateInput) {
  @Field()
  id: string;
}
