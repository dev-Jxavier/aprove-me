import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { Assignor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssignorService {
    constructor(private prismaService: PrismaService) { }

    async create(data: CreateAssignorDto): Promise<Assignor> {
        return this.prismaService.assignor.create({ data })
    }
}
