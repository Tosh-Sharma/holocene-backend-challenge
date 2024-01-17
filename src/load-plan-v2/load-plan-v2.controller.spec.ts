import { Test, TestingModule } from '@nestjs/testing';
import { LoadPlanV2Controller } from './load-plan-v2.controller';
import { LoadPlanV2Service } from './load-plan-v2.service';

describe('LoadPlanV2Controller', () => {
  let controller: LoadPlanV2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadPlanV2Controller],
      providers: [LoadPlanV2Service],
    }).compile();

    controller = module.get<LoadPlanV2Controller>(LoadPlanV2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
