import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class MovieCreateInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  releaseDate!: Date;
}
