import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt/dist";


@Module({
    imports:[JwtModule.register({
      global: true})],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule{}

