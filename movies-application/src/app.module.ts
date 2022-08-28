import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { JwtStrategy } from './common/jwt.strategy';

import { MoviesResolver } from './movies.resolver';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: ({ req }) => {
        req.user;
      },
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        // prismaOptions: {
        //   datasources: {
        //     db: {
        //       url: 'mongodb+srv://ikas-mongo:ikas-mongo@cluster0.drmkli6.mongodb.net/movie?retryWrites=true&w=majority',
        //     },
        //   },
        // },
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
  ],
  providers: [MoviesResolver, JwtStrategy],
})
export class AppModule {}
