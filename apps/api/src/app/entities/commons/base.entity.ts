import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

@Entity()
export class BaseEntity {
    @ApiProperty()
    @Column({nullable: true})
    createdBy: string;

    @ApiProperty()
    @Column({type: 'timestamp'})
    createdDate: Date;

    @ApiProperty()
    @Column({nullable: true})
    updatedBy: string;

    @ApiProperty()
    @Column({type: 'timestamp'})
    updatedDate: Date;
}