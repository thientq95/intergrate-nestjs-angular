import { Body, Controller, Post, Put, Query, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../v1/base.controller';
import { FileInterceptor, FilesInterceptor, } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileInput, FileUploadDto } from './interfaces/file-input.interface';
import { Multer } from 'multer';

@ApiTags('uploads')
@Controller('upload')
export class UploadController extends BaseController {
    constructor() {
        super();
    }

    @Post('file')
    @UseInterceptors(FileInterceptor('file', { dest: "./uploads" }))
    @ApiConsumes('multipart/form-data')
    uploadFile(
        @UploadedFile() file
    ) {
        console.log(file);
    }

    @Post("files")
    @UseInterceptors(FilesInterceptor("files[]", 10, { dest: "./uploads" }))
    uploadMultiple(@UploadedFiles() files) {
        console.log(files);
    }
}
