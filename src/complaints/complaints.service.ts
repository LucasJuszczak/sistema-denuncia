import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Complaints } from './entities/complaints.entity';
import { CreateComplaintsDto } from './dto/create-complaints.dto';
import { UpdateComplaintsDto } from './dto/update-complaints.dto';

@Injectable()
export class ComplaintsService {
    // Lista de memória
    private complaints: Complaints[] = [
        {
            id: 1,
            title: "Teste",
            description: "aaa",
            location: "rua ..., 123" ,
            completed: false
        }
    ]

    findAll(){
        return this.complaints
    }

    findOne(id: number){
        const complaints = this.complaints.find(complaints => complaints.id === id)

        if(complaints) return complaints

        throw new HttpException("This complaint doesn't exist!", HttpStatus.NOT_FOUND)
    }

    create(createComplaintsDto: CreateComplaintsDto){
        const newId = this.complaints.length + 1

        const newComplaints = {
            id: newId,
            ...createComplaintsDto,
            completed: false
        }

        this.complaints.push(newComplaints)

        return newComplaints
    }

    update(id: number, updateComplaintsDto: UpdateComplaintsDto){
        const complaintIndex = this.complaints.findIndex(complaint => complaint.id === id)

        if(complaintIndex < 0)
            throw new HttpException("This complaint doesn't exist!", HttpStatus.NOT_FOUND)

        const complaintItem = this.complaints[complaintIndex]

        this.complaints[complaintIndex] = {
            ...complaintItem,
            ...updateComplaintsDto
        }

        return "Updated complaint!"
    }

    remove(id: number){
        const complaintIndex = this.complaints.findIndex(complaint => complaint.id === id)

        if(complaintIndex < 0)
            throw new HttpException("This complaint doesn't exist!", HttpStatus.NOT_FOUND)

        this.complaints.splice(complaintIndex, 1)

        return "Deleted complaint!!"
    }
}
