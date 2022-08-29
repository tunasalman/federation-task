import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class MovieUpdateInput {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id!: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @IsOptional()
  name?: string;

  @Field()
  @IsDateString()
  @IsOptional()
  releaseDate?: Date;
}
