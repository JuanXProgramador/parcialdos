import { Test, TestingModule } from '@nestjs/testing';
import { PonentesService } from './ponentes.service';

describe('PonentesService', () => {
  let service: PonentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PonentesService],
    }).compile();

    service = module.get<PonentesService>(PonentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
