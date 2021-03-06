import { ApiProperty } from "@nestjs/swagger";

export class CreateCatalogDto {
    @ApiProperty()
    title: string;
    
    @ApiProperty()
    description: string;

    @ApiProperty()
    slug: string;
}