import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class CreateNewsDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    photoUrl: string;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    short: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty()
    catalogId: number;
}