import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { News } from '../../entities/news.entity';
import { BaseController } from '../v1/base.controller';
import { CreateNewsDto } from './models/create.dto';
import { UpdateNewsDto } from './models/update.dto';
import { IRequestPaged, PagedResult } from '../../core/models/paginate.model';
import { NewsService } from './news.service';

@ApiTags('news')
@Controller('news')
export class NewsController extends BaseController {
    constructor(private newsService: NewsService) {
        super();
    }
    @Post()
    @ApiResponse({
        status: 201,
        type: News,
    })
    @ApiResponse({ status: 400 })
    async create(@Body() model: CreateNewsDto): Promise<News> {
        return await this.newsService.create(model);
    }

    @Put()
    @ApiResponse({
        status: 200,
        type: News,
    })
    @ApiResponse({ status: 400 })
    async update(@Body() model: UpdateNewsDto): Promise<News> {
        return await this.newsService.update(model);
    }

    @Get('/paging')
    @ApiResponse({
        status: 200,
        type: [News],
    })
    @ApiResponse({ status: 400 })
    async paging(
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10,
        @Query('search') search?: string
    ): Promise<PagedResult<News>> {
        limit = limit > 100 ? 100 : limit;
        const request = {
            page,
            limit,
            search
        } as IRequestPaged;

        return await this.newsService.paginate(request);
    }

    @Get('/')
    @ApiResponse({
        status: 200,
        type: [News],
    })
    @ApiResponse({ status: 400 })
    async findAll(): Promise<News[]> {
        return await this.newsService.findAll();
    }

    @Get('/:id')
    @ApiResponse({
        status: 200,
        type: News,
    })
    @ApiResponse({ status: 400 })
    async findOne(@Param('id') id: number): Promise<News> {
        return await this.newsService.findOne(id);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        type: News,
    })
    @ApiResponse({ status: 400 })
    async delete(@Param('id') id: number): Promise<News> {
        return await this.newsService.remove(id);
    }
}
