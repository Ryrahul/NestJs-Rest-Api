import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto/bookmark.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkservice: BookmarkService) {}
  @UseGuards(AuthGuard)
  @Post()
  addBookmark(@Body() dto: BookmarkDto, @Req() request: any) {
    try {
      const UserId = request.user.UserId;
      return this.bookmarkservice.addBookmark(UserId, dto);
    } catch (e) {
      console.log(e);

      return e.message;
    }
  }
  @UseGuards(AuthGuard)
  @Get()
  getBookmark(@Req() request: any) {
    const UserId = request.user.UserId;
    return this.bookmarkservice.getBookmark(UserId);
  }
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deletebookmark(@Req() request: any, @Param('id', ParseIntPipe) id: number) {
    try {
      const UserId = request.user.UserId;
      const BookmarkId = id;
      return this.bookmarkservice.deletBookmark(UserId, BookmarkId);
    } catch (e) {
      return e.message;
    }
  }
  @UseGuards(AuthGuard)
  @Put('/:id')
  updatebookmark(
    @Body() dto: BookmarkDto,
    @Req() request: any,
    @Param('id', ParseIntPipe) id: number
  ) {
    const UserId = request.user.UserId;
    const bookmark = id;
    return this.bookmarkservice.updateBookmark(UserId, bookmark, dto);
  }
}
