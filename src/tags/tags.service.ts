import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tags } from './entities/tags.entity';
import { CreateTagsDto } from './dto/create-tags.dto';
import { UpdateTagsDto } from './dto/update-tags.dto';

@Injectable()
export class TagsService {
    // Lista de memória
    private tags: Tags[] = [
        {
            id: 1,
            name: "Tag 01"
        }
    ]

    findAll(){
        return this.tags
    }

    findOne(id: number){
        const tags = this.tags.find(tags => tags.id === id)

        if(tags) return tags

        throw new HttpException("This tag doesn't exist!", HttpStatus.NOT_FOUND)
    }

    create(createTagsDto: CreateTagsDto){
        const newId = this.tags.length + 1

        const newTags = {
            id: newId,
            ...createTagsDto
        }

        this.tags.push(newTags)

        return newTags
    }

    update(id: number, updateTagsDto: UpdateTagsDto){
        const tagIndex = this.tags.findIndex(tag => tag.id === id)

        if(tagIndex < 0)
            throw new HttpException("This tag doesn't exist!", HttpStatus.NOT_FOUND)
        
        const tagItem = this.tags[tagIndex]

        this.tags[tagIndex] = {
            ...tagItem,
            ...updateTagsDto
        }

        return "Updated tag!!"
    }

    remove(id: number){
        const tagIndex = this.tags.findIndex(tag => tag.id === id)

        if(tagIndex < 0)
            throw new HttpException("This tag doesn't exist!", HttpStatus.NOT_FOUND)
        
        this.tags.splice(tagIndex, 1)

        return "Deleted tag!!!"
    }
}
