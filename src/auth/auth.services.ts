import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import *  as argon from 'argon2'


@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService){}
   
    async signup(dto:AuthDto){
        const hash=await argon.hash(dto.password.toString())
        const user =await this.prisma.user.create({
            data:{
                email:dto.email,
                hash,
                firstName:dto.firstName,
                lastName:dto.lastName

            },
            select:{
                id:true,
                email:true,
                createdAt:true
            }
        })
        return user
        
    }
    login(){}
  
}


