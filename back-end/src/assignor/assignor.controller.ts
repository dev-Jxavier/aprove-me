import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { AssignorService } from './assignor.service';
import { UpdatePayableDto } from '../payable/dto/update-payable.dto';

@Controller('integrations/assignor')
export class AssignorController {
    constructor(private readonly assignorService: AssignorService) { }

    @Post('/')
    create(@Body() createAssignorDto: CreateAssignorDto) {
        return this.assignorService.create(createAssignorDto);
    }

    @Get()
    getAll() {
        return this.assignorService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.assignorService.getById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
        return this.assignorService.update(id, updatePayableDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.assignorService.remove(id);
    }
}
