import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthenticate, Role, UserInfo } from './interface/user.interface'
import { AuthenticateDto } from './dto/authenticate.dto'
import { sign } from 'jsonwebtoken'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
    ) {}

    async authenticate(authenticateDto: AuthenticateDto): Promise<IAuthenticate> {
        const user = await this.userService.findByUsernameAndPassword(authenticateDto.username, authenticateDto.password)
        
        if (!user) throw new NotFoundException('Invalid credentials')

        const token = sign({...user}, '1234')

        return {token, user}
    }
}
