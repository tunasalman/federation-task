import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  @Field(() => User)
  user: User;
}
