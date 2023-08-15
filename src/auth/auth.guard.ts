import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwt:JwtService,private config:ConfigService){}
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request=context.switchToHttp().getRequest();
        const token=this.extractTokenFromHeader(request)
        if(!token){
            throw new UnauthorizedException
        }
        try{
            const payload=await this.jwt.verifyAsync(
                token,
                {
                    secret:this.config.get("JWT_SECRET")

                }
            );
            request['user']=payload

        }
        catch(e){
            throw new UnauthorizedException

        }
        return true
    }
      private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

