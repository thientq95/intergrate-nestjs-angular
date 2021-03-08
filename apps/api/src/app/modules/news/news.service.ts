import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { DB_TABLE } from '../../core/constants/app.constant';
import { IRequestPaged, PagedResult } from '../../core/models/paginate.model';
import { Catalog } from '../../entities';
import { News } from '../../entities/news.entity';
import { CreateNewsDto } from './models/create.dto';
import { UpdateNewsDto } from './models/update.dto';

@Injectable()
export class NewsService {
    private catalogRepository;
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
        private connection: Connection
    ) {
        this.catalogRepository = this.connection.getRepository(Catalog);
    }

    async paginate(req: IRequestPaged): Promise<PagedResult<News>> {
        const skippedItems = (req.page - 1) * req.limit;

        const totalCount = await this.newsRepository.count()
        const dataSet = await this.newsRepository.createQueryBuilder()
            .orderBy('id', "DESC")
            .where("title like :name", { name: '%' + req.search + '%' })
            .offset(skippedItems)
            .limit(req.limit)
            .getMany()

        return {
            totalItems: totalCount,
            page: req.page,
            limit: req.limit,
            data: dataSet,
        }
    }

    async findAll(): Promise<News[]> {
        return await this.newsRepository.find();
    }

    async findOne(id: number): Promise<News> {
        return await this.newsRepository.findOne(id);
    }

    async create(model: CreateNewsDto): Promise<News> {
        const catalog = await this.catalogRepository.findOne(model.catalogId);
        const news = this.newsRepository.create(model);
        news.catalog = catalog;

        // save 
        await this.newsRepository.save(news);
        return news;
    }

    async update(model: Partial<UpdateNewsDto>): Promise<News> {
        const catalog = this.catalogRepository.findOne(model.catalogId);
        // Find existing news
        const newsExisting = await this.newsRepository.findOne(model.id);

        // Set field
        newsExisting.title = model.title;
        newsExisting.content = model.content;
        newsExisting.short = model.short;
        newsExisting.photoUrl = model.photoUrl;
        newsExisting.slug = model.slug;
        newsExisting.catalog = catalog;

        await this.newsRepository.update({ id: model.id }, newsExisting);
        return await this.newsRepository.findOne(model.id, { relations: [DB_TABLE.CATALOG] });
    }

    async remove(id: number): Promise<News> {
        const existingNews = await this.newsRepository.findOne(id);
        if (existingNews) {
            await this.newsRepository.delete(id);
        }

        return existingNews;
    }
}
