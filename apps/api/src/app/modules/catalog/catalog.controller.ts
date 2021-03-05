import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { ICatalog } from './interfaces/catalog.interface';
import { CreateCatalogDto } from './models/create.dto';

@Controller('catalogs')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}
  @Post()
  async create(@Body() model: CreateCatalogDto) {
    this.catalogService.create(model);
  }

  @Get()
  async findAll(): Promise<ICatalog[]> {
    return this.catalogService.findAll();
  }
}
