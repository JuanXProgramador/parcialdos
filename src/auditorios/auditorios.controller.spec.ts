import { Test, TestingModule } from '@nestjs/testing';
import { AuditoriosController } from './auditorios.controller';
import { AuditoriosService } from './auditorios.service';

describe('AuditoriosController', () => {
  let controller: AuditoriosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditoriosController],
      providers: [AuditoriosService],
    }).compile();

    controller = module.get<AuditoriosController>(AuditoriosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
