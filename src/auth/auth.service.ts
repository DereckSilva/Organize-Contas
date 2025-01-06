import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptHash } from 'src/CryptHash/crypt-hash.encrypt';
import { ErrorFoundUser, ErrorInvalidPassword } from 'src/errors/errors';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptHash: CryptHash,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user.length === 0) {
      throw new ErrorFoundUser();
    }
    if (!(await this.cryptHash.comparePassword(password, user[0].password))) {
      throw new ErrorInvalidPassword();
    }
    const payload = { email: user[0].email, sub: user[0].slug };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
