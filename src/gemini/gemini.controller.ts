import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { PromptDto } from './dto/prompt.dto';

@Controller('gemini')
export class GeminiController {
    constructor(private readonly geminiService: GeminiService) {}

    @Post('ask')
    @UsePipes(new ValidationPipe({transform:true}))
    async ask(@Body() promptDto: PromptDto) {
        return this.geminiService.generateText(promptDto);
    }
}
