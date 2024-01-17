import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LoadPlanModule } from './load-plan/load-plan.module';
import { LoadPlanV2Module } from './load-plan-v2/load-plan-v2.module';

@Module({
  imports: [PrismaModule, LoadPlanModule, LoadPlanV2Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
