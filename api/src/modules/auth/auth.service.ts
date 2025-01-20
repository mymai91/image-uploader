import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dtos/signin.dto';
import * as bcrypt from 'bcrypt';
import { SignInResponseDto } from './dtos/signin-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  // TODO handle error with code number
  async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const user = await this.userService.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email, sub: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }
}
