import { Injectable } from '@nestjs/common';
import { Message } from '@fullstack-js/api-interfaces';
import { ICatalog } from './interfaces/catalog.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from '../../entities/catalog.entity';
import { Repository } from 'typeorm';
import { CreateCatalogDto } from './models/create.dto';
import { UpdateCatalogDto } from './models/update.dto';

import { PagedResult } from '../../core/models/paginate.model';

@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(Catalog)
        private catalogRepository: Repository<Catalog>,
    ) { }

    async paginate(page: number, limit: number): Promise<PagedResult<Catalog>> {
        const skippedItems = (page - 1) * limit;
        console.log(skippedItems);

        const totalCount = await this.catalogRepository.count()
        const dataSet = await this.catalogRepository.createQueryBuilder()
            .orderBy('id', "DESC")
            .offset(skippedItems)
            .limit(limit)
            .getMany()

        return {
            totalItems: totalCount,
            page: page,
            limit: limit,
            data: dataSet,
        }
    }

    async findAll(): Promise<Catalog[]> {
        return await this.catalogRepository.find();
    }

    async findOne(id: number): Promise<Catalog> {
        return await this.catalogRepository.findOne(id);
    }

    async create(model: CreateCatalogDto): Promise<Catalog> {
        const catalog = this.catalogRepository.create(model);
        await this.catalogRepository.save(model);
        return catalog;
    }

    async update(model: Partial<UpdateCatalogDto>): Promise<Catalog> {
        await this.catalogRepository.update({ id: model.id }, model);
        return await this.catalogRepository.findOne(model.id);
    }

    async remove(id: number): Promise<Catalog> {
        const existingCatalog = await this.catalogRepository.findOne(id);
        if (existingCatalog) {
            await this.catalogRepository.delete(id);
        }

        return existingCatalog;
    }
}
