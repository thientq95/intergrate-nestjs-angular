import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlugProvider } from '../../core/providers/slug.provider';
import { Catalog } from '../../entities/catalog.entity';
import { CatalogController } from './catalog.controller';
import { CatalogRepository } from './catalog.repository';
import { CatalogService } from './catalog.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Catalog, CatalogRepository])
  ],
  controllers: [CatalogController],
  providers: [CatalogService, SlugProvider]
})
export class CatalogModule { }