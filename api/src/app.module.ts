import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ImagesModule } from './modules/images/images.module';
import { AuthModule } from './modules/auth/auth.module';
import jwtConfig from './config/jwt.config';
import { UserUtil } from './common/utils/user.utils';
import { ScheduleModule } from '@nestjs/schedule';
// import { TasksModule } from './tasks/tasks.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes env variables available throughout the app
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // use migration
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(), // The .forRoot() call initializes the scheduler and registers any declarative cron jobs, timeouts and intervals that exist within your app.
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        // Add retry strategy
        maxRetriesPerRequest: 20,
        retryStrategy(times: number) {
          return Math.min(times * 50, 2000);
        },
      },
    }),
    UsersModule,
    ImagesModule,
    AuthModule,
    // TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserUtil],
  exports: [UserUtil],
})
export class AppModule {}
