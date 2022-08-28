import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { MovieRateCreateInput } from './rate-create.dto';

@InputType()
export class MovieRateUpdateInput extends OmitType(
  PartialType(MovieRateCreateInput),
  ['movieId'],
) {
  @Field()
  id: string;
}
