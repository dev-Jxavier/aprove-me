import { Body, Controller, Post } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { AssignorService } from './assignor.service';

@Controller('integrations')
export class AssignorController {
    constructor(private readonly assignorService: AssignorService) { }

    @Post('/assignor')
    create(@Body() createAssignorDto: CreateAssignorDto) {
        return this.assignorService.create(createAssignorDto);
    }
}
