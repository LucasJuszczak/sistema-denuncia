import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintsDto } from './dto/create-complaints.dto';
import { UpdateComplaintsDto } from './dto/update-complaints.dto';

@Controller('complaints')
export class ComplaintsController {
    constructor(private readonly complaintsService: ComplaintsService) {}

    @Get()
    findAllComplaints(){
        return this.complaintsService.findAll()
    }

    @Get(':id')
    findOneComplaint(@Param('id', ParseIntPipe) id: number){
        return this.complaintsService.findOne(id)
    }

    @Post()
    createComplaint(@Body() createComplaintsDto: CreateComplaintsDto){
        return this.complaintsService.create(createComplaintsDto)
    }

    @Patch(':id')
    updateComplaint(@Param('id', ParseIntPipe) id: number, @Body() updateComplaintsDto: UpdateComplaintsDto){
        return this.complaintsService.update(id, updateComplaintsDto)
    }

    @Delete(':id')
    removeComplaint(@Param('id', ParseIntPipe) id: number){
        return this.complaintsService.remove(id)
    }
}
