import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    GraphQLModule.forRoot({
      server: {
        context: ({ req }) => {
          return { jwt: req.headers.authorization };
        },
      },
      gateway: {
        buildService: ({ url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set('Authorization', context.jwt);
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://users-service:3001/graphql' },
            { name: 'movies', url: 'http://movies-service:3002/graphql' },
            { name: 'rates', url: 'http://rates-service:3003/graphql' },
          ],
        }),
      },

      driver: ApolloGatewayDriver,
    }),
  ],
})
export class AppModule {}
