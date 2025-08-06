import { GoogleGenAI, Models } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PromptDto } from './dto/prompt.dto';
import { v4 } from 'uuid';

const GEMINI_MODEL = 'gemini-1.5-flash-latest'; // Modèle par défaut

@Injectable()
export class GeminiService {
    private readonly googleAI: GoogleGenAI;
    private readonly model: any;
    private chatSessions: Map<string, any> = new Map(); // Pour stocker les sessions de chat
    
    constructor(configService: ConfigService) {
        // Initialisation du service Gemini
        console.log('GeminiService initialized');
        const geminiApiKey = configService.get<string>('GEMINI_API_KEY');
        this.googleAI = new GoogleGenAI({
            apiKey: geminiApiKey,  });

        this.model = this.googleAI.models.generateContent({
            model: GEMINI_MODEL,
            contents:'Why sky is bleu'
        })
        
        console.log(this.model.text)
    }

    private getChatSession(sessionId?:String){
        let sessionIdToUse= sessionId || v4();
    }
    async generateText(data:PromptDto){

    }
}
