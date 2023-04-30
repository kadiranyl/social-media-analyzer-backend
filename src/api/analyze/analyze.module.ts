import { Module } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AnalyzeController } from './analyze.controller';

@Module({
  providers: [AnalyzeService],
  imports: [],
  controllers: [AnalyzeController],
})
export class AnalyzeModule {}
