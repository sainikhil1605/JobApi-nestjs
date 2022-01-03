import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
export class UserDto {
  @IsString()
  @ApiProperty({ example: 'John', description: 'Name of the user' })
  name: string;
  @IsDefined()
  @IsEmail()
  @ApiProperty({ example: 'John@gmail.com', description: 'Email of the user' })
  email: string;
  @IsString()
  @ApiProperty({ example: '12345678', description: 'Password of the user' })
  password: string;
}

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createuserdto: UserDto): Promise<User> {
    const createdUser = await this.userModel.create(createuserdto);
    if (!createdUser) {
      throw new HttpException('User creation failed', HttpStatus.BAD_REQUEST);
    }
    return createdUser;
  }
  async findOne(email: string): Promise<User | UserDocument> {
    const user = await this.userModel.findOne({ email }).exec();

    return user;
  }
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find({}).exec();
    return users;
  }
}
