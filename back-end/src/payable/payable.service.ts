import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Payable } from '@prisma/client';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Injectable()
export class PayableService {
    constructor(private prismaService: PrismaService) { }

    async create(data: CreatePayableDto): Promise<Payable> {
        return this.prismaService.payable.create({ data })
    }

    async getAll(): Promise<Payable[]> {
        return this.prismaService.payable.findMany({})
    }

    async getById(id: string) {
        return this.prismaService.payable.findUnique({ where: { id } })
    }

    async update(id: string, updatePayableDto: UpdatePayableDto) {
        return this.prismaService.payable.update({ where: { id }, data: updatePayableDto })
    }

    async remove(id: string) {
        await this.prismaService.payable.delete({ where: { id } })
    }
}
