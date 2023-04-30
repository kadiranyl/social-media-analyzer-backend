import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { AnalyzeAccountDto } from './dtos/analyze-account.dto';
import { SocialMediaAnalyzeType } from '../../core/enums/social-media-analyze-type.enum';

const DEFAULT_MODEL_ID = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 1;

@Injectable()
export class AnalyzeService {
  private readonly openAIApi: OpenAIApi;

  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get('OPENAI_API_KEY'),
      organization: 'org-9jn7uFN8Ak2IqOwgzzBJLEPq',
    });

    this.openAIApi = new OpenAIApi(configuration);
  }

  async analyzeAccount(analyzeAccountDto: AnalyzeAccountDto): Promise<any> {
    const { accountLink, type } = analyzeAccountDto;
    let prompt: string;

    switch (type) {
      case SocialMediaAnalyzeType.ADVISE:
        prompt = `Give important advises for social media account. Advises must be according to given account and personalized. Give only correct information. Make small jokes. The social media account link is ${accountLink}`;
        break;
      case SocialMediaAnalyzeType.DEEP_ANALYZE:
        prompt = `Analyze that account in detail and tell. Make this analysis page based and personalized. Give only correct information. If profile is secret say that before everything. Make small jokes. The social media account link is ${accountLink}`;
        break;
    }
    const params = {
      prompt: prompt,
      model: DEFAULT_MODEL_ID,
      max_tokens: 1000,
      temperature: DEFAULT_TEMPERATURE,
    };

    const response = await this.openAIApi.createCompletion(params);
    console.log(response);
    return response.data.choices[0].text;
  }
}
