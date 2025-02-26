import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: any) {
    try {
      const user = await this.usersService.create(createUserDto);
      const { password, ...result } = user;
      
      return {
        user: result,
        access_token: this.jwtService.sign({ username: user.username, sub: user.id }),
      };
    } catch (error) {
      throw error;
    }
  }
}
