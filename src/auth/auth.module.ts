import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";
import { PrismaModule } from "src/prisma/prisma.module";


@Module({
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule{}

