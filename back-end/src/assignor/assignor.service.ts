import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { Assignor } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Injectable()
export class AssignorService {
    constructor(private prismaService: PrismaService) { }

    async create(data: CreateAssignorDto): Promise<Assignor> {
        return this.prismaService.assignor.create({ data })
    }

    async getAll(): Promise<Assignor[]> {
        return this.prismaService.assignor.findMany({})
    }

    async getById(id: string) {
        return this.prismaService.assignor.findUnique({ where: { id } })
    }

    async update(id: string, updateAssignorDto: UpdateAssignorDto) {
        return this.prismaService.assignor.update({ where: { id }, data: updateAssignorDto })
    }

    async remove(id: string) {
        await this.prismaService.assignor.delete({ where: { id } })
    }
}
