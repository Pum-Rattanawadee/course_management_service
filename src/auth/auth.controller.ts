import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common'
import {AuthService} from './auth.service'
import { AuthenticateDto } from './dto/authenticate.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
        try {
            const response = await this.authService.authenticate(authenticateDto)
            return res.status(HttpStatus.OK).json({ response })
        } catch (error) {
            res.status(error.status).json(error.response)
        }
    }
}
