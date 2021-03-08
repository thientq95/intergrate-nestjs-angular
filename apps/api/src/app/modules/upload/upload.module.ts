import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlugProvider } from '../../core/providers/slug.provider';
import { Catalog } from '../../entities/catalog.entity';
import { UploadController } from './upload.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([])
  ],
  controllers: [UploadController],
  providers: []
})
export class UploadModule { }