import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto/bookmark.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkservice: BookmarkService) {}
  @UseGuards(AuthGuard)
  @Post('addBookmark')
  addBookmark(@Body() dto: BookmarkDto, @Req() request: any) {
    try {
      const UserId = request.user.UserId;
      console.log(UserId);
      return this.bookmarkservice.addBookmark(UserId, dto);
    } catch (e) {
      console.log(e);

      return e.message;
    }
  }
  @UseGuards(AuthGuard)
  @Get('getBookmark')
  getBookmark(@Req() request: any) {
    const UserId = request.user.UserId;
    return this.bookmarkservice.getBookmark(UserId);
  }
}
