import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService) {}

    async signIn(userDto: UserDto) {
        if(!userDto.name || !userDto.password) {
            throw new BadRequestException("Invalid username or password");
        }
        const user = await this.userRepo.findOne({ where: { name: userDto.name } });
        if(!user) {
            throw new UnauthorizedException("Invalid username or password");
        }
        const comparePass = await bcrypt.compare(userDto.password, user.password);
        if(!comparePass) {
            throw new UnauthorizedException("Invalid username or password");
        }
        const payload = { sub: user.id, username: user.name }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async seedUser(dto: UserDto) {
        if(!dto.name || !dto.password) {
            throw new BadRequestException("Invalid username or password");
        }
        const hashedPass = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({ name: dto.name, password: hashedPass});
        return await this.userRepo.save(user);
    }
}
