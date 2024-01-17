import { Test, TestingModule } from '@nestjs/testing';
import { LoadPlanV2Service } from './load-plan-v2.service';

describe('LoadPlanV2Service', () => {
  let service: LoadPlanV2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadPlanV2Service],
    }).compile();

    service = module.get<LoadPlanV2Service>(LoadPlanV2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
