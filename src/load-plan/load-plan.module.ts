import { Module } from '@nestjs/common';
import { LoadPlanService } from './load-plan.service';
import { LoadPlanController } from './load-plan.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [LoadPlanController],
  providers: [LoadPlanService],
  imports: [PrismaModule],
})
export class LoadPlanModule {}
