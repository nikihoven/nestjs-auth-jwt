export type JwtPayload = {
    nickname: string
    id: string
}

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string }