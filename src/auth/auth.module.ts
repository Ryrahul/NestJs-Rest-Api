import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt/dist";
import { jwtConstants } from "./auth.constants";


@Module({
    imports:[JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule{}

