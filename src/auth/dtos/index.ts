import { IsNotEmpty, IsString, Length } from 'class-validator'

export class AuthDto {
    @IsNotEmpty({message: 'Nickname is required'})
    @IsString({message: 'Nickname must be a string'})
    @Length(6, 24, {message: 'Nickname must contain more than 6 and less than 24 characters'})
    nickname: string

    @IsNotEmpty({message: 'Password is required'})
    @IsString()
    @Length(6, 24, {message: 'Password must contain more than 6 and less than 24 characters'})
    password: string
}

export type ResponseAuthDto = {
    id: string
    nickname: string
    accessToken: string
}

export type ResponseRefreshDto = {
    accessToken: string
}
