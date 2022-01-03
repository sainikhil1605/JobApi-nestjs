import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JobDto {
  @IsString()
  @ApiProperty({ description: 'Company Name', example: 'Google' })
  company: string;
  @IsString()
  @ApiProperty({ description: 'Job Title', example: 'Software Engineer' })
  position: string;
  @IsString()
  @ApiProperty({ description: 'Job Status', example: 'Applied' })
  status: string;
}
