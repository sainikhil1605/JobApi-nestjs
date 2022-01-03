import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.comparePassword(password)) {
      return user;
    }
    return null;
  }
  async generateJWT(user: any) {
    const payload = { userId: user.id, email: user.email, name: user.name };
    const jwt = await this.jwtService.sign(payload);
    return { access_token: jwt };
  }
}
