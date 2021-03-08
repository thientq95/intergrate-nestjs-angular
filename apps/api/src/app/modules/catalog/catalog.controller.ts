import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Catalog } from '../../entities/catalog.entity';
import { BaseController } from '../v1/base.controller';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './models/create.dto';
import { UpdateCatalogDto } from './models/update.dto';
import { PagedResult } from '../../core/models/paginate.model';

@ApiTags('catalogs')
@Controller('catalogs')
export class CatalogController extends BaseController {
    constructor(private catalogService: CatalogService) {
        super();
    }
    @Post()
    @ApiResponse({
        status: 201,
        type: Catalog,
    })
    @ApiResponse({ status: 400 })
    async create(@Body() model: CreateCatalogDto): Promise<Catalog> {
        return await this.catalogService.create(model);
    }

    @Put()
    @ApiResponse({
        status: 200,
        type: Catalog,
    })
    @ApiResponse({ status: 400 })
    async update(@Body() model: UpdateCatalogDto): Promise<Catalog> {
        return await this.catalogService.update(model);
    }

    @Get('/paging')
    @ApiResponse({
        status: 200,
        type: [Catalog],
    })
    @ApiResponse({ status: 400 })
    async paging(
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10,
    ): Promise<PagedResult<Catalog>> {
        limit = limit > 100 ? 100 : limit;
        return await this.catalogService.paginate(page, limit);
    }

    @Get('/')
    @ApiResponse({
        status: 200,
        type: [Catalog],
    })
    @ApiResponse({ status: 400 })
    async findAll(): Promise<Catalog[]> {
        return await this.catalogService.findAll();
    }

    @Get('/:id')
    @ApiResponse({
        status: 200,
        type: Catalog,
    })
    @ApiResponse({ status: 400 })
    async findOne(@Param('id') id: number): Promise<Catalog> {
        return await this.catalogService.findOne(id);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        type: Catalog,
    })
    @ApiResponse({ status: 400 })
    async delete(@Param('id') id: number): Promise<Catalog> {
        return await this.catalogService.remove(id);
    }
}
