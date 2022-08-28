import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { SignupInput } from './dto/signup.input';
import { Auth } from './models/auth.model';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('data') { email, password }: SignupInput) {
    return await this.auth.createUser(email.toLowerCase(), password);
  }

  @Mutation(() => Auth)
  async login(@Args('data') { email, password }: LoginInput) {
    return await this.auth.login(email.toLowerCase(), password);
  }

  @Mutation(() => Auth)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }
}
