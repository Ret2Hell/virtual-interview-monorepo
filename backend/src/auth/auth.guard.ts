import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Invalid or missing authorization header',
      );
    }

    return super.canActivate(context);
  }

  handleRequest<TUser = User>(err: unknown, user: TUser): TUser {
    if (err || !user) {
      if (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';

        console.error('JWT Authentication Error:', errorMessage);
      }
      throw new UnauthorizedException(
        err instanceof Error
          ? err.message
          : 'Invalid or expired authorization token',
      );
    }
    return user;
  }
}
