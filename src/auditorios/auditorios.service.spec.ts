import { Test, TestingModule } from '@nestjs/testing';
import { AuditoriosService } from './auditorios.service';

describe('AuditoriosService', () => {
  let service: AuditoriosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditoriosService],
    }).compile();

    service = module.get<AuditoriosService>(AuditoriosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
