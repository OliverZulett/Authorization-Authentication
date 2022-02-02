import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private ROUNDS = 10;

  async getHash(password: string) {
    return await bcrypt.hash(password, this.ROUNDS);
  }

  async isMatch(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
