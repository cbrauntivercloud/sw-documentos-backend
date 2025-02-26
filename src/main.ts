import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import { HttpExceptionFilter } from "./filters/http-exception.filter"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix("api")
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle("SW Documentos API")
    .setDescription("API para la gestión de documentos")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  const port = process.env.PORT || 3000
  await app.listen(port)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()

