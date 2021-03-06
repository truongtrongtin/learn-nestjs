import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const { email, password } = req.body;
      const user = this.userService.getAuthenticated(email, password);
      if (!user) {
        return false;
      }
      req.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}
