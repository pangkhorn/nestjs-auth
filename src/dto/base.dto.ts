import { V } from '@constants/index';
import * as regex from '@constants/regex.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ type: 'number', name: 'size', default: 25, required: false })
  @IsOptional()
  size = 25;

  @ApiProperty({ type: 'number', name: 'page', default: 1, required: false })
  @IsOptional()
  page = 1;

  @ApiProperty({ type: 'string', name: 'sort', required: false, description: 'Ex: createdAt:desc' })
  @IsOptional()
  @IsString({ message: V.STRING })
  sort?: string;

  @ApiProperty({ type: 'string', name: 'keyword', required: false, description: 'Keyword search anything' })
  @IsOptional()
  @IsString({ message: V.STRING })
  @Matches(regex._string, { message: V.REGEX })
  keyword?: string;
}
