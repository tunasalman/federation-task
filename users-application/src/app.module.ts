import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './users/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        // prismaOptions: {
        //   datasources: {
        //     db: {
        //       url: 'mongodb+srv://ikas-mongo:ikas-mongo@cluster0.drmkli6.mongodb.net/user?retryWrites=true&w=majority',
        //     },
        //   },
        // },
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ], // configure your prisma middleware
      },
    }),
  ],
})
export class AppModule {}
