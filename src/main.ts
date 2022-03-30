import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const configService = app.get(ConfigService)
    const port = configService.get('PORT')

    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe({
        errorHttpStatusCode: 406
    }))

    await app.listen(port || 3333, () => console.log(`Server has been started on port ${port}`))
}

bootstrap()