import { Field, InputType } from '@nestjs/graphql';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class MovieRateCreateInput {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  movieId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  comment: string;

  @Field()
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  rating: number;
}
