import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });
    if (admin && (await bcrypt.compare(pass, admin.motDePasseHash))) {
      const { motDePasseHash, ...result } = admin;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.idAdmin };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.idAdmin,
        email: user.email,
        name: user.nom,
      },
    };
  }
}
