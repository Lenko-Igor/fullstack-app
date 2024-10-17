import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const PORT = process.env.PORT || 4200

  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()

  await app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
  })
}

bootstrap()
