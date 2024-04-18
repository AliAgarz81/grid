import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentDto } from './content.dto';
import { ContentService } from './content.service';
import { AuthGuard } from 'src/user/user.guard';

@Controller('content')
export class ContentController {
    constructor(private readonly contentServices: ContentService) {}

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file'))
    createContent(@UploadedFile() file: Express.Multer.File, @Body() contentDto: ContentDto) {
        if(!file) {
            throw new BadRequestException();
        }
        return this.contentServices.create({title: contentDto.title, desc: contentDto.description, imgPath: file.filename});
    }

    @Get()
    @HttpCode(HttpStatus.OK) 
    getContents() {
        return this.contentServices.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK) 
    getContent(@Param('id') id) {
        return this.contentServices.get(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK) 
    updateContent(@Param('id') id, @Body() contentDto: ContentDto) {
        return this.contentServices.update(id, contentDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    deleteContent(@Param('id') id: number) {
        return this.contentServices.delete(id);
    }
}
