import { IsOptional, IsString } from 'class-validator';

export class PromptDto {
  @IsString()
  prompt: string;

  @IsString()
  @IsOptional()
  sessionId? : string;
}