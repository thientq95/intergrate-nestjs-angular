import { EntityRepository, Repository } from "typeorm";
import { Catalog } from "../../entities";
import { CreateNewsDto } from "../news/models/create.dto";

@EntityRepository(Catalog)
export class CatalogRepository extends Repository<Catalog> {
    createEntity = async (dto: CreateNewsDto) => {
        return await this.save(dto);
    };
}