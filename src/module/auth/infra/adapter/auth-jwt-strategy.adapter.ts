import { Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { REQUEST_CONTEXT, USER_MESSAGES_ERRORS } from '@common/enum';
import { RequestContextInterface } from '@common/request-context';

@Injectable()
export class AuthJwtStrategyAdapter extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly requestContextService: ClsService<RequestContextInterface>,
  ) {
    super({
      secretOrKey: configService.get<string>('accessTokenSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(
    _: Request,
    { sub: id }: Record<string, any>,
    done: VerifiedCallback,
  ): VerifiedCallback {
    this.requestContextService.set(REQUEST_CONTEXT.USER_ID, id);
    return done(null, { id });
  }
}

@Injectable()
export class Auth extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException(USER_MESSAGES_ERRORS.USER_UNAUTHORIZED);
    }
    return user;
  }
}

@Injectable()
export class OptionalAuth extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (err || !user) {
      return null;
    }
    return user;
  }
}
