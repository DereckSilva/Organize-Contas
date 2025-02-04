import { Module } from '@nestjs/common';
import { CryptHash } from 'src/CryptHash/crypt-hash.encrypt';
import { SlugService } from 'src/slug/slug.service';
import { UserService } from 'src/user/user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],

  controllers: [UserController],
  providers: [UserService, SlugService, CryptHash, EventEmitter2],
  exports: [],
})
export class UserModule {}
