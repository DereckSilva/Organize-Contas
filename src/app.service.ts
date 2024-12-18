import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    await this.connection.createCollection('users');
    await this.connection.createCollection('expenses');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
