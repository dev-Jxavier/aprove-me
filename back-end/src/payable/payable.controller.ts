import { Body, Controller, Post } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PayableService } from './payable.service';

@Controller('integrations')
export class PayableController {
    constructor(private readonly payableService: PayableService) { }

    @Post('/payable')
    create(@Body() createPayableDto: CreatePayableDto) {
        return this.payableService.create(createPayableDto);
    }

}
