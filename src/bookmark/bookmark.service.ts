import { Injectable } from '@nestjs/common';
import { BookmarkDto } from './dto/bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async addBookmark(UserId: number, dto: BookmarkDto): Promise<object> {
    try {
      const Bookmark = await this.prisma.bookmark.create({
        data: {
          UserId,
          ...dto,
        },
      });
      return Bookmark;
    } catch (e) {
      return e.message;
    }
  }
  async getBookmark(UserId: number): Promise<object> {
    const bookmark = await this.prisma.bookmark.findMany({
      where: {
        UserId,
      },
    });
    return bookmark;
  }
}
