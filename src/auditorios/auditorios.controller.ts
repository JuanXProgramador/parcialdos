import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditoriosService } from './auditorios.service';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';
import { UpdateAuditorioDto } from './dto/update-auditorio.dto';

@Controller('auditorios')
export class AuditoriosController {
  constructor(private readonly auditoriosService: AuditoriosService) {}

  @Post()
  create(@Body() createAuditorioDto: CreateAuditorioDto) {
    return this.auditoriosService.create(createAuditorioDto);
  }

  @Get()
  findAll() {
    return this.auditoriosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditoriosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditorioDto: UpdateAuditorioDto) {
    return this.auditoriosService.update(+id, updateAuditorioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditoriosService.remove(+id);
  }
}
