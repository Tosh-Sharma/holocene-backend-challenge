import { Test, TestingModule } from '@nestjs/testing';
import { LoadPlanService } from './load-plan.service';

describe('LoadPlanService', () => {
  let service: LoadPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadPlanService],
    }).compile();

    service = module.get<LoadPlanService>(LoadPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
