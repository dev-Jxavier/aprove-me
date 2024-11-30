import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PayableService } from './payable.service';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Controller('integrations/payable')
export class PayableController {
    constructor(private readonly payableService: PayableService) { }

    @Post('/')
    create(@Body() createPayableDto: CreatePayableDto) {
        return this.payableService.create(createPayableDto);
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.payableService.getById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
        return this.payableService.update(id, updatePayableDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.payableService.remove(id);
    }

}
