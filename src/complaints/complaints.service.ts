import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComplaintsDto } from './dto/create-complaints.dto';
import { UpdateComplaintsDto } from './dto/update-complaints.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ComplaintsService {
    constructor(private readonly prisma: PrismaService){}

    async findAll(paginationDto: PaginationDto){
        const {limit = 10, offset = 0} = paginationDto
        const allComplaints = await this.prisma.complaint.findMany({
            take:limit,
            skip: offset,
            orderBy:{createdAt: 'desc'}
        })
        return allComplaints
    }

    async findOne(id: number){
        const complaint = await this.prisma.complaint.findFirst({
            where: {id: id}
        })

        if(complaint?.title) return complaint

        throw new HttpException("This complaint doesn't exist!", HttpStatus.NOT_FOUND)
    }

    async create(createComplaintsDto: CreateComplaintsDto){
        try{
            const newComplaint = await this.prisma.complaint.create({
                data: {
                    title: createComplaintsDto.title,
                    description: createComplaintsDto.description,
                    location: createComplaintsDto.location,
                    completed: false,
                    tagId: createComplaintsDto.tagId
                }
            })
            return newComplaint
        }catch(e){
            throw new HttpException("Unable to create complaint!", HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, updateComplaintsDto: UpdateComplaintsDto){
        try{
            const findComplaint = await this.prisma.complaint.findFirst({
                where: {id: id}
            })

            if (!findComplaint)
                throw new HttpException("This complaint doesn't exist!", HttpStatus.NOT_FOUND)

            const complaint = await this.prisma.complaint.update({
                where: {id: findComplaint.id},
                data: {
                    title: updateComplaintsDto.title ? updateComplaintsDto.title : findComplaint.title,
                    description: updateComplaintsDto.description ? updateComplaintsDto.description : findComplaint.description,
                    location: updateComplaintsDto.location ? updateComplaintsDto.location : findComplaint.location,
                    completed: updateComplaintsDto.completed ? updateComplaintsDto.completed : findComplaint.completed,
                    tagId: updateComplaintsDto.tagId ? updateComplaintsDto.tagId : findComplaint.tagId
                }
            })
            return complaint
        } catch(e){
            throw new HttpException("Unable to update complaint!", HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: number){
        try{
            const findComplaint = await this.prisma.complaint.findFirst({
                where: {id: id}
            })

            if(!findComplaint)
                throw new HttpException("This complaint doesn't exist!", HttpStatus.NOT_FOUND)

            await this.prisma.complaint.delete({
                where: {id: findComplaint.id}
            })
            return "Deleted complaint sucessfully!"
        } catch(e){
            throw new HttpException("Unable to delete complaint!", HttpStatus.BAD_REQUEST)
        }
    }
}