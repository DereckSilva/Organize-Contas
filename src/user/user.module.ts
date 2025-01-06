import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { SlugService } from 'src/slug/slug.service';
import { CryptHash } from 'src/CryptHash/crypt-hash.encrypt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, SlugService, CryptHash],
  exports: [UserService],
})
export class UserModule {}
