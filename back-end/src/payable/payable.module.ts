import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PayableController } from './payable.controller';

@Module({
  providers: [PayableService, PrismaService],
  exports: [PayableService],
  controllers: [PayableController]
})
export class PayableModule { }
