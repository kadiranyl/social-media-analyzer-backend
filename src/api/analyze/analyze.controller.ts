import { Body, Controller, Post } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AnalyzeAccountDto } from './dtos/analyze-account.dto';

@Controller('analyze')
export class AnalyzeController {
  constructor(private analyzeService: AnalyzeService) {}

  @Post()
  async analyzeRequest(@Body() analyzeAccountDto: AnalyzeAccountDto) {
    return await this.analyzeService.analyzeAccount(analyzeAccountDto);
  }
}
