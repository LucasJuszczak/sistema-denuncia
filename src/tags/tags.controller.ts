import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagsDto } from './dto/create-tags.dto';
import { UpdateTagsDto } from './dto/update-tags.dto';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }

    @Get()
    findAllTags(){
        return this.tagsService.findAll()
    }

    @Get(':id')
    findOneTag(@Param('id', ParseIntPipe) id: number){
        return this.tagsService.findOne(id)
    }

    @Post()
    createTag(@Body() createTagsDto: CreateTagsDto){
        return this.tagsService.create(createTagsDto)
    }

    @Patch(':id')
    updateTag(@Param('id', ParseIntPipe) id: number, @Body() updateTagsDto: UpdateTagsDto){
        return this.tagsService.update(id, updateTagsDto)
    }

    @Delete(':id')
    removeTag(@Param('id', ParseIntPipe) id: number){
        return this.tagsService.remove(id)
    }
}
