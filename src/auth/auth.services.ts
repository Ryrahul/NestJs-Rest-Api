import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import *  as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService,private jwt:JwtService){}
   
    async signup(dto:AuthDto){
        try{
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
    catch(e){
        if(e.code=='P2002'){
            return `validation error of ${e.meta.target}`
        }



    }
        
    }
    async login(dto:AuthDto){
        try{
            const user=await this.prisma.user.findUnique({
                where:{
                    email:dto.email
                }
            })
            if(!user){
                throw new ForbiddenException(
                    'Credentials Incorrect'
                )
            }
            const match=await argon.verify(user.hash,dto.password)
            if(!match){
                throw new ForbiddenException(
                    'Credentials Incorrect'
                )
            }
            const payload={id:user.id,email:user.email}
            const token = this.jwt.signAsync(payload)

        return{
            token:await this.jwt.signAsync(payload)
        }



        }
        catch(e){
            return e.message

        }
    }
  
}


