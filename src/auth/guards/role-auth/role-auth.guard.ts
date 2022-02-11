import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  private roles: string[];

  constructor(...roles: string[]) {
    this.roles = roles;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const { user } = ctx.getRequest();
    if (!this.roles.includes(user.user_role)) {
      throw new ForbiddenException('Forbidden Role');
    }
    return true;
  }
}
