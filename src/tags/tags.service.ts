import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagsDto } from './dto/create-tags.dto';
import { UpdateTagsDto } from './dto/update-tags.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TagsService {
    constructor(private readonly prisma: PrismaService){}

    async findAll(paginationDto: PaginationDto){
        const {limit = 10, offset = 0} = paginationDto
        const allTags = await this.prisma.tag.findMany({
            take:limit,
            skip: offset,
            orderBy:{createdAt: 'desc'}
        })
        return allTags
    }

    async findOne(id: number){
        const tag = await this.prisma.tag.findFirst({
            where: {id: id},
            select: {
                id: true,
                name: true,
                description: true,
                complaint: true
            }
        })

        if(tag) return tag

        throw new HttpException("Tag not found!", HttpStatus.NOT_FOUND)
    }
    
    async create(createTagsDto: CreateTagsDto){
        try{
            const newTag = await this.prisma.tag.create({
                data: {
                    name: createTagsDto.name,
                    description: createTagsDto.description
                },
                select:{
                    id: true,
                    name: true,
                    description: true
                }
            })
            return newTag
        }catch(e){
            throw new HttpException("Unable to create tag!", HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, updateTagsDto: UpdateTagsDto){
        try{
            const findTag = await this.prisma.tag.findFirst({
                where: {id: id}
            })

            if (!findTag)
                throw new HttpException("This tag doesn't exist!", HttpStatus.NOT_FOUND)

            const tag = await this.prisma.tag.update({
                where: {id: findTag.id},
                data: {
                    name: updateTagsDto.name ? updateTagsDto.name : findTag.name,
                    description: updateTagsDto.description ? updateTagsDto.description : findTag.description
                }
            })
            return tag
        } catch(e){
            throw new HttpException("Unable to update tag!", HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: number){
        try{
            const findTag = await this.prisma.tag.findFirst({
                where: {id: id}
            })

            if(!findTag)
                throw new HttpException("This tag doesn't exist!", HttpStatus.NOT_FOUND)

            await this.prisma.tag.delete({
                where: {id: findTag.id}
            })
            return "Deleted tag sucessfully!"
        } catch(e){
            throw new HttpException("Unable to delete tag!", HttpStatus.BAD_REQUEST)
        }
    }
}
