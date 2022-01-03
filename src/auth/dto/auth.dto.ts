import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'John@gmail.com', description: 'Email of the User' })
  email: string;
  @ApiProperty({ example: '12345678', description: 'Password of the user' })
  password: string;
}
