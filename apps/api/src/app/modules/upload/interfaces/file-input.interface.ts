import { ApiProperty } from "@nestjs/swagger";

export class FileInput {
    @ApiProperty()
    name: string;
}

export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}