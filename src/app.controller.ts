import {
  Body,
  Controller, Post,
  Request,
  UseGuards
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
import { LocalGuard } from './auth/guards/local.guard';
import { UserDto, UserService } from './users/user.service';
import { ValidationPipe } from './validation.pipe';

@ApiTags('Auth')
@Controller('/api/v1/')
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // @ApiBearerAuth('access-token')
  // @ApiOperation({ summary: 'Login with email and password' })
  // @UseGuards(JwtGuard)
  // @Get('/')
  // getHello() {
  //   return this.userService.findAll();
  // }

  @UseGuards(LocalGuard)
  @Post('/login')
  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, description: '{access_token:}' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Request() req) {
    return this.authService.generateJWT(req.user);
  }

  @Post('/signup')
  @ApiOperation({ summary: 'User SignUp' })
  @ApiResponse({ status: 201, description: '{access_token:}' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  signUp(@Body(new ValidationPipe()) usercreated: UserDto) {
    const user = this.userService.create(usercreated);
    return this.authService.generateJWT(user);
  }
}
