import { Module } from '@nestjs/common';
import { LoadPlanV2Service } from './load-plan-v2.service';
import { LoadPlanV2Controller } from './load-plan-v2.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LoadPlanV2Controller],
  providers: [LoadPlanV2Service],
  imports: [PrismaModule],
})
export class LoadPlanV2Module {}
