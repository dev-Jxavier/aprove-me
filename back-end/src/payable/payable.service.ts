import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Payable } from '@prisma/client';

@Injectable()
export class PayableService {
    constructor(private prismaService: PrismaService) { }

    async create(data: CreatePayableDto): Promise<Payable> {
        return this.prismaService.payable.create({ data })
    }
}
