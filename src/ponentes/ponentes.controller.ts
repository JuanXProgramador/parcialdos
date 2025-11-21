import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PonentesService } from './ponentes.service';
import { CreatePonenteDto } from './dto/create-ponente.dto';
import { UpdatePonenteDto } from './dto/update-ponente.dto';

@Controller('ponentes')
export class PonentesController {
  constructor(private readonly ponentesService: PonentesService) {}

  @Post()
  create(@Body() createPonenteDto: CreatePonenteDto) {
    return this.ponentesService.create(createPonenteDto);
  }

  @Get()
  findAll() {
    return this.ponentesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ponentesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePonenteDto: UpdatePonenteDto) {
    return this.ponentesService.update(+id, updatePonenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ponentesService.remove(+id);
  }
}
