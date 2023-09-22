import { User } from '../entities/user.entity';

export class UserDto {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    image: string;
}

export const transformUserEntity = (userDto: UserDto) => {
    let user = new User()
    user.id = userDto.id,
    user.firstName = userDto.firstName
    user.lastName = userDto.lastName
    user.role = userDto.role
    return user
}

export const transformUserDto = (user: User) => {
    const userDto: UserDto = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        image: user.image
    }
    return userDto
}
