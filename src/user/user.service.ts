import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileDto } from './dto/Profile.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(id: number): Promise<object> {
    const me = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return {
      user: me,
    };
  }
  async editMe(id: number, dto: ProfileDto): Promise<object> {
    try{
    const user= await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        
        ...dto,
      },
    });
    return user
  }
  catch(e){
    return e.message
  }
  }
  async deleteUser(id:number):Promise<string>{
    const me=await this.prisma.user.delete({
        where:{
            id:id
        }
    })
    return `deleted user:${me.toString()}`


  }
}
