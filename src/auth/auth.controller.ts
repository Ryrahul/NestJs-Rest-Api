import { Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import { AuthService } from "./auth.services";
import { AuthDto, ProfileDto } from "./dto";
import { dot } from "node:test/reporters";
import { AuthGuard } from "./auth.guard";



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto:AuthDto ) {
    console.log({ dto });
    return this.authService.signup(dto);
  }



    @Post('login')
    login(@Body() dto:AuthDto){
        return this.authService.login(dto)
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    profile(@Body()dto:ProfileDto){
      return this.authService.viewProfile(dto)

    }

    
        

    
}