import { Body, Controller, Delete, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import { ProfileDto } from './dto/Profile.dto';

@Controller('users')
export class UserController {
  constructor(private userServices: UserService) {}
  @UseGuards(AuthGuard)
  @Get()
  getUser(@Req() request: any) {
    const id = request.user.UserId;
    return this.userServices.getMe(id);
  }
  @UseGuards(AuthGuard)
  @Put()
  updateUser(@Req() request: any,@Body()dto:ProfileDto){
    const id=request.user.UserId
    return this.userServices.editMe(id,dto)


  }
  @UseGuards(AuthGuard)
  @Delete()
  deleteUser(@Req() request: any){
    const id =request.user.UserId
    return this.userServices.deleteUser(id)


  }
}

