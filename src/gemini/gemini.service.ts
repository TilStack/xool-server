import { GoogleGenAI, Models } from '@google/genai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PromptDto } from './dto/prompt.dto';
import { v4 } from 'uuid';

const GEMINI_MODEL = 'gemini-2.5-flash'; // Modèle par défaut

@Injectable()
export class GeminiService {
    private readonly googleAI: GoogleGenAI;
    // Table de sessions de chat (clé : sessionId, valeur : chat object)
    private chatSessions = new Map<string, ReturnType<GoogleGenAI['chats']['create']>>();// Pour stocker les sessions de chat
    private readonly logger = new Logger(GeminiService.name) 

    constructor(configService: ConfigService) {
        // Initialisation du service Gemini
        const geminiApiKey = configService.get<string>('GEMINI_API_KEY');
        this.googleAI = new GoogleGenAI({
            apiKey: geminiApiKey,  
            vertexai: configService.get('USE_VERTEXAI') || false,
            project: configService.get('GOOGLE_CLOUD_PROJECT'),
            location: configService.get('GOOGLE_CLOUD_LOCATION'),
        });
        console.log('GeminiService initialized------------------------------------------------------');
    }

    private getChatSession(sessionId?: string) {
        const sid = sessionId || v4();
        let chat = this.chatSessions.get(sid);

        if (!chat) {
            chat = this.googleAI.chats.create({
                model: 'gemini-1.5-flash', // ou gemini-1.5-pro
            });
            this.chatSessions.set(sid, chat);
            this.logger.log(`💬 Nouvelle session de chat créée : ${sid}`);
        }

        return { sessionId: sid, chat };
    }
    
    async generateText(data:PromptDto){
        try {
            const response = await this.googleAI.models.generateContent({
                model: GEMINI_MODEL,
                contents: data.prompt
            });
            console.log(response.text);
        } catch (error) {
            console.log(error)
            this.logger.error('Error generating text:', error);
        }
    }
}
