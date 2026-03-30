import { Controller, Post, Body, UnauthorizedException, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Endpoint de connexion admin
   */
  @Post('login')
  async login(@Body() body: any) {
    console.log('--- LOGIN ATTEMPT ---');
    console.log('Email:', body.email);
    console.log('Password provided:', body.password ? '****' : 'MISSING');
    
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      console.log('RESULT: Unauthorized (Incorrect credentials)');
      throw new UnauthorizedException('Identifiants incorrects');
    }
    
    console.log('RESULT: Success for user', user.email);
    return this.authService.login(user);
  }

  /**
   * Test de route sécurisée
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
