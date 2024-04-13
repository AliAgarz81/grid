import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'multer.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';

@Module({
  imports: [
    MulterModule.register(multerConfig),
    TypeOrmModule.forFeature([Content]),
  ],
  providers: [ContentService],
  controllers: [ContentController]
})
export class ContentModule {}
