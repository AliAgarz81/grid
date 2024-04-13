import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from './content/content.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { Content } from './content/content.entity';

@Module({
  imports: [
    MulterModule.register(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.DB,
      host: process.env.HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      entities: [User, Content],
      synchronize: true
    }),
    ContentModule,
    UserModule,
    ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
