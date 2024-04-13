import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs'
import { promisify } from 'util';
import path from 'path';

@Injectable()
export class ContentService {
    constructor(@InjectRepository(Content) private readonly contentRepo: Repository<Content>) {}

    async create(dto: { title: string, desc: string, imgPath:string }){
        if(!dto.desc || !dto.title) {
            throw new BadRequestException("Invalid credentials");
        }
        const content = this.contentRepo.create({title: dto.title, description: dto.desc, imgPath: dto.imgPath});
        return await this.contentRepo.save(content);
    }

    async getAll() {
        const contents = await this.contentRepo.find();
        return contents;
    }

    async get(id: number) {
        const content = await this.contentRepo.findOne({ where: { id } });
        if(!content) {
            throw new NotFoundException("Content not found");
        }
        return content;
    }

    async update(id: number ,dto: { title: string, description: string, imgPath:string }) {
        const content = await this.contentRepo.findOne({ where: { id } });
        if(!content) {
            throw new NotFoundException("Content not found");
        }
        Object.assign(content, dto);
        return await this.contentRepo.save(content);
    }

    async delete(id: number) {
        const content = await this.contentRepo.findOne({ where: { id } });
        if(!content) {
            throw new NotFoundException("Content not found");
        }
        await this.contentRepo.remove(content);
        return "Deleted successfully"
    }
}
