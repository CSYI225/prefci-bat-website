import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'sup3rS3cr3t!',
    });
  }

  async validate(payload: any) {
    const admin = await this.prisma.admin.findUnique({
      where: { idAdmin: payload.sub }
    });
    if (!admin) throw new UnauthorizedException();
    return { userId: payload.sub, email: payload.email };
  }
}
