import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Unauthorized No Token');
    }

    try {
      if (!this.jwtService) {
        console.error('JwtService is undefined');
        throw new Error('JwtService not properly injected');
      }

      // Add logging to debug
      console.log('JWT Secret:', this.configService.get('jwt.secret')); // Check if secret is undefined

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('jwt.secret'), // Add type safety
      });

      console.log('Payload:', payload);
      request['user'] = payload;
      return true;
    } catch (error) {
      console.error('Error:', error);
      throw new UnauthorizedException('Unauthorized invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization.split(' ') || [];

    return type === 'Bearer' ? token : undefined;
  }
}
