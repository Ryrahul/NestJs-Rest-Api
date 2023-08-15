import { IsNotEmpty, IsOptional } from 'class-validator';

export class BookmarkDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  @IsOptional()
  description: string;
  @IsNotEmpty()
  link: string;
}
