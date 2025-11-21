import { Test, TestingModule } from '@nestjs/testing';
import { PonentesController } from './ponentes.controller';
import { PonentesService } from './ponentes.service';

describe('PonentesController', () => {
  let controller: PonentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PonentesController],
      providers: [PonentesService],
    }).compile();

    controller = module.get<PonentesController>(PonentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
