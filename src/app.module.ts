import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [
     ConfigModule.forRoot({ isGlobal: true }),// Pour les variabls d'environnement
     GeminiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
