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
export class MovieRateUpdateInput {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id!: string;

  @Field()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(250)
  comment?: string;

  @Field()
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  rating?: number;
}
