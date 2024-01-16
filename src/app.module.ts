import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LoadPlanModule } from './load-plan/load-plan.module';

@Module({
  imports: [PrismaModule, LoadPlanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
