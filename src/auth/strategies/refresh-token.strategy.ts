import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { Request } from 'express'
import { JwtPayload, JwtPayloadWithRt } from '../types'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req && req.cookies['token'] ? req.cookies['token'] : null
            ]),
            secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET'),
            passReqToCallback: true
        })
    }

    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
        const refreshToken = req.cookies.token

        if (!refreshToken) throw new UnauthorizedException()

        return {
            ...payload,
            refreshToken
        }
    }
}