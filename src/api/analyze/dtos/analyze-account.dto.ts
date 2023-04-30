import { IsEnum, IsString, IsUrl } from 'class-validator';
import { SocialMediaAnalyzeType } from '../../../core/enums/social-media-analyze-type.enum';

export class AnalyzeAccountDto {
  @IsString()
  @IsUrl()
  accountLink: string;

  @IsString()
  @IsEnum(SocialMediaAnalyzeType)
  type: SocialMediaAnalyzeType;
}
