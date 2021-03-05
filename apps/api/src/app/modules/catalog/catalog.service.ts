import { Injectable } from '@nestjs/common';
import { Message } from '@fullstack-js/api-interfaces';
import { ICatalog } from './interfaces/catalog.interface';

@Injectable()
export class CatalogService {
  private readonly catalogs: ICatalog[] = [];

  create(model: ICatalog) {
    this.catalogs.push(model);
  }

  findAll(): ICatalog[] {
    return this.catalogs;
  }
}
