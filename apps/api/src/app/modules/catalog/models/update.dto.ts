import { ApiProperty } from "@nestjs/swagger";

export class UpdateCatalogDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;
    
    @ApiProperty()
    slug: string;
}