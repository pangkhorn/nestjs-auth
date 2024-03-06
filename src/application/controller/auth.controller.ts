import { AUTH_SERVICE, IAuthService } from '@domains/service';
import { LoginDto } from '@dtos/auth.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({ path: 'auth' })
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: IAuthService) {}
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return { auth: await this.authService.login(dto) };
  }
}
