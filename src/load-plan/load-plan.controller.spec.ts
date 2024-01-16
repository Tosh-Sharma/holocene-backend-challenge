import { Test, TestingModule } from '@nestjs/testing';
import { LoadPlanController } from './load-plan.controller';
import { LoadPlanService } from './load-plan.service';

describe('LoadPlanController', () => {
  let controller: LoadPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadPlanController],
      providers: [LoadPlanService],
    }).compile();

    controller = module.get<LoadPlanController>(LoadPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
