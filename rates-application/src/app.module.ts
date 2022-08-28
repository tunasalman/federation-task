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
import { Movie } from './models/movie.entity';
import { MovieRateResolver } from './movie-rate.resolver';
import { MovieResolver } from './movie.resolver';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      context: ({ req }) => {
        req.user;
      },

      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      buildSchemaOptions: {
        orphanedTypes: [Movie],
      },
    }),
    PrismaModule.forRoot({
      isGlobal: true,

      prismaServiceOptions: {
        // prismaOptions: {
        //   datasources: {
        //     db: {
        //       url: 'mongodb+srv://ikas-mongo:ikas-mongo@cluster0.drmkli6.mongodb.net/rate?retryWrites=true&w=majority',
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
  providers: [MovieRateResolver, MovieResolver, JwtStrategy],
})
export class AppModule {}
