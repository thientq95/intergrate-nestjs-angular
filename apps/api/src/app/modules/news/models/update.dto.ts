import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class UpdateNewsDto {
    @ApiProperty()
    id: number;

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