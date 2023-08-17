import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const bookmark = await this.prisma.bookmark.findMany({
        where: {
          UserId,
        },
      });
      return bookmark;
    } catch (e) {
      return e.message;
    }
  }
  async deletBookmark(UserId: number, bookmarkId: number) {
    try {
      const bookmark = await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });
      if (!bookmark || bookmark.UserId !== UserId) {
        throw new ForbiddenException('Permission Denied');
      }
      await this.prisma.bookmark.delete({
        where: {
          id: bookmarkId,
        },
      });
      return `deleted the bookmark--->> ${bookmark}`;
    } catch (e) {
      return e.message;
    }
  }
  async updateBookmark(UserId: number, bookmarkId: number, dto: BookmarkDto) {
    try {
      const bookmark = await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });
      // console.log(bookmark.UserId)
      console.log(UserId);
      if (!bookmark || bookmark.UserId !== UserId) {
        throw new ForbiddenException('Permission Denied');
      }
      return await this.prisma.bookmark.update({
        where: {
          id: bookmarkId,
        },
        data: {
          ...dto,
        },
      });
    } catch (e) {
      return e.message;
    }
  }
}
