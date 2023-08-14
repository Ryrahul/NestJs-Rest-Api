import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";


@Injectable()
export class AuthService{
    constructor(prisma:PrismaService){}
    login(){
        return ' logged in'
    }
    signup(){
        return 'signup'
    }
}