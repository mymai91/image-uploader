import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('User management API')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Serve static files from uploads directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.enableCors();
  await app.listen(3000);

  // console.log(`Application is running on: ${await app.getUrl()}`);
  // console.log(
  //   `Swagger documentation is available at: ${await app.getUrl()}/api`,
  // );
}
bootstrap();
