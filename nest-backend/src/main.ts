import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('API Desafio SHARENERGY')
    .setDescription('Api do desafio SHARENERGY, para vaga de Dev. 2023')
    .setVersion('1.0')
    .addTag('Geral')
    .addSecurity('bearer', {
      scheme: 'bearer',
      type: 'apiKey',
      description: 'O token de autorização deve ser fornecido no formato "Bearer xyz"',
      name: 'Authorization',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
